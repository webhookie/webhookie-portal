import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";

@Component({
  selector: 'app-order-rate-sub-links',
  templateUrl: './order-rate-sub-links.component.html',
  styleUrls: ['./order-rate-sub-links.component.css']
})
export class OrderRateSubLinksComponent implements OnInit {

  constructor(public context: WebhooksContext) {
  }

  get selectedTopic() {
    return this.context.selectedTopic
  }

  ngOnInit(): void {
  }

}
