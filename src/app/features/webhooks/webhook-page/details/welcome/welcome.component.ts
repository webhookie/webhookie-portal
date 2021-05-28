import {Component, OnInit} from '@angular/core';
import {WebhookGroupService} from "../../../service/webhook-group.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {WebhookGroup} from "../../../model/webhook-group";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(private readonly service: WebhookGroupService) {
  }

  ngOnInit(): void {
  }

  get isEmpty(): Observable<boolean> {
    return this.webhooks$
      .pipe(map(it => it.length == 0))
  }

  get webhooks$(): Observable<Array<WebhookGroup>> {
    return this.service.filteredWebhook$
  }
}
