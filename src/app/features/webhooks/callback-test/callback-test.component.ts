import {Component, OnInit, ViewChild} from '@angular/core';
import {CallbackUrlComponent} from "./callback-url/callback-url.component";
import {ResponseComponent} from "../common/response/response.component";
import {RequestExampleComponent} from "../common/request-example/request-example.component";
import {CallbackService} from "../service/callback.service";
import {WebhooksContext} from "../webhooks-context";

@Component({
  selector: 'app-callback-test',
  templateUrl: './callback-test.component.html',
  styleUrls: ['./callback-test.component.css']
})
export class CallbackTestComponent implements OnInit {
  // @ts-ignore
  @ViewChild('callbackUrlComponent') callback: CallbackUrlComponent
  // @ts-ignore
  @ViewChild('responseComponent') response?: ResponseComponent
  // @ts-ignore
  @ViewChild('requestExampleComponent') request: RequestExampleComponent

  subscribe: boolean = true;

  constructor(
    private readonly context: WebhooksContext,
    private readonly callbackService: CallbackService
  ) {
  }

  ngOnInit(): void {
  }

  title() {
    return `Test ${this.context.selectedTopic?.name} Webhook`
  }

  test() {
    this.response?.invalidate()
    this.callbackService.testCallback(this.callback.request)
      .subscribe(it => {
        this.response?.update(it)
      })
  }
}
