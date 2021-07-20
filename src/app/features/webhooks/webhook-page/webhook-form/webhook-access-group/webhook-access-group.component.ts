import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WebhookieService} from "../../../../../shared/service/webhookie.service";
import {DropdownEntry} from "../../../../../shared/model/dropdownEntry";
import {MultiSelectComponent} from "../../../../../shared/components/multi-select/multi-select.component";
import {map} from "rxjs/operators";
import {AccessGroupSelection, WebhookApiAccess} from "../webhook-api-form";
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
  @ViewChild("selectComponent") selectComponent!: MultiSelectComponent
  @Input() filter: (entry: DropdownEntry) => boolean = () => true
  groups: Array<DropdownEntry> = [];

  groupAccess: number = WebhookApiAccess.PUBLIC;
  private itemsSubscription?: Subscription;

  constructor(
    private readonly webhookieService: WebhookieService
  ) { }

  ngOnInit(): void {
    this.webhookieService.fetchAccessGroups(`/group/${this.path}`)
      .subscribe(list => {
        this.groups = list.map(it => new DropdownEntry(it.iamGroupName, it.name))
          .filter(it => this.filter(it))
      });
  }

  setAsPublic() {
    this.itemsSubscription?.unsubscribe();
    this.selectComponent.clearSelection();
    this.groupAccess = WebhookApiAccess.PUBLIC
    this.control.setValue(AccessGroupSelection.initPublic());
  }

  setAsRestricted() {
    this.itemsSubscription = this.selectComponent.selectedItems$
      .pipe(map(it => Array.from(it)))
      .subscribe(it => {
        this.control.setValue(AccessGroupSelection.restricted(it));
      })

    this.groupAccess = WebhookApiAccess.RESTRICTED
  }

  get isRestricted(): boolean {
    return this.groupAccess == WebhookApiAccess.RESTRICTED
  }

  init(value: AccessGroupSelection) {
    this.selectComponent.initSelection(value.items);
    if(value.access == WebhookApiAccess.PUBLIC) {
      this.setAsPublic()
    } else {
      this.setAsRestricted();
    }
  }
}
