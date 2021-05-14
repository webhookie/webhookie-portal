import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-webhook-rate-sub-links',
  templateUrl: './webhook-rate-sub-links.component.html',
  styleUrls: ['./webhook-rate-sub-links.component.css']
})
export class WebhookRateSubLinksComponent implements OnInit {

  constructor(public context: WebhooksContext) {
  }

  get selectedTopic(): Observable<string> {
    return this.context.topic$
      .pipe(map(it => it.description))
  }

  ngOnInit(): void {
  }

}
