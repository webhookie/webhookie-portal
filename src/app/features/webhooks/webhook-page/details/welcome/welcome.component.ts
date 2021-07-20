import {Component, OnInit} from '@angular/core';
import {WebhookApiService} from "../../../service/webhook-api.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {WebhookApi} from "../../../model/webhook-api";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(private readonly service: WebhookApiService) {
  }

  ngOnInit(): void {
  }

  get isEmpty(): Observable<boolean> {
    return this.webhooks$
      .pipe(map(it => it.length == 0))
  }

  get webhooks$(): Observable<Array<WebhookApi>> {
    return this.service.filteredWebhook$
  }
}
