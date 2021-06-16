import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../../../features/webhooks/webhooks-context";
import {ApplicationContext} from "../../../../shared/application.context";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private readonly appContext: ApplicationContext,
    private readonly ctx: WebhooksContext
  ) {
  }

  ngOnInit(): void {
  }

  clearContext() {
    this.ctx.clearWebhookSelection();
  }

  subscriptionsIsAvailable(): Observable<boolean> {
    return this.appContext.isUser;
  }

  trafficIsAvailable(): Observable<boolean> {
    return this.appContext.isUser;
  }

  hasAdminRole(): boolean {
    return this.appContext.hasAdminRole;
  }

  subscriptionsHomeLink(): Observable<string|undefined> {
    return this.roleHomeLink( "/subscriptions/consumer", "/subscriptions/provider")
  }

  trafficHomeLink(): Observable<string> {
    return this.roleHomeLink("/traffic/subscription", "/traffic/webhook")
  }

  private roleHomeLink(consumerHome: string, providerHome: string): Observable<string> {
    return this.appContext.loggedInUser$
      .pipe(
        map(it => {
          if(it.hasConsumerRole()) {
            return consumerHome
          }

          if(it.hasAdminRole() || it.hasProviderRole()) {
            return providerHome
          }

          return "/"
        })
      )
  }
}
