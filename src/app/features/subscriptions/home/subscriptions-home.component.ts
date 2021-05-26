import {Component, OnInit} from '@angular/core';
import {ApplicationContext} from "../../../shared/application.context";

@Component({
  selector: 'app-subscriptions-home',
  templateUrl: './subscriptions-home.component.html',
  styleUrls: ['./subscriptions-home.component.css']
})
export class SubscriptionsHomeComponent implements OnInit {
  links: Array<any> = [];

  constructor(private readonly appContext: ApplicationContext) {
  }

  ngOnInit(): void {
    if(this.appContext.hasConsumerRole) {
      this.links.push(...[
        {
          key: "/subscriptions/consumer",
          value: "Your subscriptions"
        }
      ])
    }
    if(this.appContext.hasProviderRole || this.appContext.hasAdminRole) {
      this.links.push(...[
        {
          key: "/subscriptions/provider",
          value: "Your webhook subscriptions"
        }
      ])
    }
  }

}
