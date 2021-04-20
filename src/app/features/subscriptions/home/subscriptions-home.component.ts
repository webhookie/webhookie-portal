import {Component, OnInit} from '@angular/core';
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-subscriptions-home',
  templateUrl: './subscriptions-home.component.html',
  styleUrls: ['./subscriptions-home.component.css']
})
export class SubscriptionsHomeComponent implements OnInit {
  links: Array<KeyValue<string, string>> = [
    {
      key: "/subscriptions/consumer",
      value: "Your subscriptions"
    },
    {
      key: "/subscriptions/provider",
      value: "Your webhook subscriptions"
    }
  ]

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
