import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../../../features/webhooks/webhooks-context";
import {ApplicationContext} from "../../../../shared/application.context";
import {Observable, zip} from "rxjs";
import {map, tap} from "rxjs/operators";

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
    return this.appContext.hasConsumerRoleRx()
  }

  trafficIsAvailable(): Observable<boolean> {
    return zip(this.appContext.hasProviderRoleRx(), this.appContext.hasAdminRoleRx())
      .pipe(tap(it => console.warn(it)))
      .pipe(map(it => it[0] || it[1]))
  }
}
