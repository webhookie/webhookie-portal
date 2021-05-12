import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";

@Component({
  selector: 'app-webhook-rate-sub-links',
  templateUrl: './webhook-rate-sub-links.component.html',
  styleUrls: ['./webhook-rate-sub-links.component.css']
})
export class WebhookRateSubLinksComponent implements OnInit {

  constructor(public context: WebhooksContext) {
  }

  get selectedTopic() {
    return this.context.selectedTopic
  }

  ngOnInit(): void {
  }

}
