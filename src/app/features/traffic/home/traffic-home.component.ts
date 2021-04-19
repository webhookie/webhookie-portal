import {Component, OnInit} from '@angular/core';
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-traffic-home',
  templateUrl: './traffic-home.component.html',
  styleUrls: ['./traffic-home.component.css']
})
export class TrafficHomeComponent implements OnInit {

  links: Array<KeyValue<string, string>> = [
    {
      key: "subscription",
      value: "Subscription Traffic"
    },
    {
      key: "webhook",
      value: "Webhook Traffic"
    }
  ]
  constructor() {
  }

  ngOnInit(): void {
  }

}
