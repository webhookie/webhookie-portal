import { Component, OnInit } from '@angular/core';
import {WebhookGroupService} from "../webhook-group.service";
import {Observable} from "rxjs";

@Component({
  selector: 'webhooks-home',
  templateUrl: './webhooks-home.component.html',
  styleUrls: ['./webhooks-home.component.css']
})
export class WebhooksHomeComponent implements OnInit {
  groups$: Observable<any[]> = new Observable<any[]>()

  constructor(
    private readonly service: WebhookGroupService
  ) { }

  ngOnInit(): void {
    this.groups$ = this.service.myWebhookGroups();
  }
}
