import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Entry} from "../../../../../shared/components/search-list/search-list.component";
import {WebhookieService} from "../../../../../shared/service/webhookie.service";

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
  groups: Array<Entry> = [];

  get pControl(): FormControl {
     return this.formGroup.controls[this.id] as FormControl
  };

  constructor(
    private readonly webhookieService: WebhookieService
  ) { }

  ngOnInit(): void {
    this.webhookieService.fetchAccessGroups(this.path)
      .subscribe(list => {
        this.groups = list.map(it => new Entry(it.id, it.name))
      });
  }
}
