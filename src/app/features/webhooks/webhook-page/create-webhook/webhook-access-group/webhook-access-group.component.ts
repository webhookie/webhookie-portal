import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WebhookieService} from "../../../../../shared/service/webhookie.service";
import {DropdownEntry} from "../../../../../shared/model/dropdownEntry";
import {MultiSelectComponent} from "../../../../../shared/components/multi-select/multi-select.component";
import {map} from "rxjs/operators";
import {AccessGroupSelection, WebhookGroupAccess} from "../webhook-group-form";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-webhook-access-group',
  templateUrl: './webhook-access-group.component.html',
  styleUrls: ['./webhook-access-group.component.css']
})
export class WebhookAccessGroupComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() title!: string;
  @Input() path!: string;
  @Input() id!: string;
  @Input() formGroup!: FormGroup
  @Input() publicTitle!: string;
  groups: Array<DropdownEntry> = [];
  @ViewChild("selectComponent") selectComponent!: MultiSelectComponent

  groupAccess: number = WebhookGroupAccess.PUBLIC.valueOf();
  private itemsSubscription?: Subscription;

  constructor(
    private readonly webhookieService: WebhookieService
  ) { }

  ngOnInit(): void {
    this.initControlValue();
    this.webhookieService.fetchAccessGroups(this.path)
      .subscribe(list => {
        this.groups = list.map(it => new DropdownEntry(it.iamGroupName, it.name))
      });
  }

  setAsPublic() {
    this.itemsSubscription?.unsubscribe();
    this.selectComponent.clearSelection();
    this.groupAccess = WebhookGroupAccess.PUBLIC.valueOf()
    this.control.setValue(AccessGroupSelection.initPublic());
  }

  setAsRestricted() {
    this.itemsSubscription = this.selectComponent.selectedItems$
      .pipe(map(it => Array.from(it)))
      .subscribe(it => {
        this.control.setValue(AccessGroupSelection.restricted(it));
      })

    this.groupAccess = WebhookGroupAccess.RESTRICTED.valueOf()
  }

  get isRestricted(): boolean {
    return this.groupAccess == WebhookGroupAccess.RESTRICTED.valueOf()
  }

  private initControlValue() {
    this.control.setValue(AccessGroupSelection.initPublic());
  }
}
