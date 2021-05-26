import {Component, OnInit} from '@angular/core';
import {ApplicationContext} from "../../../shared/application.context";

@Component({
  selector: 'app-traffic-home',
  templateUrl: './traffic-home.component.html',
  styleUrls: ['./traffic-home.component.css']
})
export class TrafficHomeComponent implements OnInit {
  links: Array<any> = [];

  constructor(private readonly appContext: ApplicationContext) {
  }

  ngOnInit(): void {
    if(this.appContext.hasConsumerRole) {
      this.links.push(...[
        {
          key: "/traffic/subscription",
          value: "Subscription Traffic"
        }
      ])
    }
    if(this.appContext.hasProviderRole || this.appContext.hasAdminRole) {
      this.links.push(...[
        {
          key: "/traffic/webhook",
          value: "Webhook Traffic"
        }
      ])
    }
  }

}
