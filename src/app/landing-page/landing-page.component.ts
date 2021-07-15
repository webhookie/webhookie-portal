import {Component, OnInit} from '@angular/core';
import {WebhookGroupService} from "../features/webhooks/service/webhook-group.service";
import {Observable} from "rxjs";
import {WebhookGroup} from "../features/webhooks/model/webhook-group";
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
    private readonly service: WebhookGroupService
  ) { }

  ngOnInit(): void {
    this.service.myWebhookGroups()
      .subscribe(it => this.log.info(`${it.length} Webhook API(s) fetched...`));
  }

  get webhooks$(): Observable<Array<WebhookGroup>> {
    return this.service.allWebhook$
  }

  get isEmpty(): Observable<boolean> {
    return this.webhooks$
      .pipe(map(it => it.length == 0))
  }
}
