import {Component} from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {WebhookBaseComponent} from "../webhook-base-component";

@Component({
  selector: 'app-webhook-rate-sub-links',
  templateUrl: './webhook-rate-sub-links.component.html',
  styleUrls: ['./webhook-rate-sub-links.component.css']
})
export class WebhookRateSubLinksComponent extends WebhookBaseComponent{

  constructor(public context: WebhooksContext) {
    super(context)
  }

  get selectedTopic(): Observable<string> {
    return this.context.topic$
      .pipe(map(it => it.description))
  }

  ngOnInit(): void {
  }

}
