import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WebhookieService} from "../../../../../shared/service/webhookie.service";
import {DropdownEntry} from "../../../../../shared/model/dropdownEntry";
import {MultiSelectComponent} from "../../../../../shared/components/multi-select/multi-select.component";
import {filter} from "rxjs/operators";

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
  groups: Array<DropdownEntry> = [];
  @ViewChild("selectComponent") selectComponent!: MultiSelectComponent

  get pControl(): FormControl {
     return this.formGroup.controls[this.id] as FormControl
  };

  constructor(
    private readonly webhookieService: WebhookieService
  ) { }

  ngOnInit(): void {
    this.webhookieService.fetchAccessGroups(this.path)
      .subscribe(list => {
        this.groups = list.map(it => new DropdownEntry(it.iamGroupName, it.name))
      });
  }

  // noinspection JSUnusedGlobalSymbols
  ngAfterViewInit() {
    this.pControl.valueChanges
      .pipe(filter(it => it))
      .subscribe(() => {
        this.selectComponent.clearSelection();
      });

    this.control.valueChanges
      .subscribe(() => {});
  }
}
