import {Component, OnInit} from '@angular/core';
import {WebhookApiService} from "../features/webhooks/service/webhook-api.service";
import {Observable} from "rxjs";
import {WebhookApi} from "../features/webhooks/model/webhook-api";
import {map} from "rxjs/operators";
import {ApplicationContext} from "../shared/application.context";
import {LogService} from "../shared/service/log.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(
    private readonly appContext: ApplicationContext,
    private readonly log: LogService,
    private readonly service: WebhookApiService
  ) { }

  ngOnInit(): void {
    this.service.myWebhookApis()
      .subscribe(it => this.log.info(`${it.length} Webhook API(s) fetched...`));
  }

  get webhooks$(): Observable<Array<WebhookApi>> {
    return this.service.allWebhook$
  }

  get isEmpty(): Observable<boolean> {
    return this.webhooks$
      .pipe(map(it => it.length == 0))
  }
}
