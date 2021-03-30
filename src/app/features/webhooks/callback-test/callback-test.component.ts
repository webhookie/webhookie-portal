import {Component, OnInit, ViewChild} from '@angular/core';
import {CallbackUrlComponent} from "./callback-url/callback-url.component";
import {ResponseComponent} from "../common/response/response.component";
import {RequestExampleComponent} from "../common/request-example/request-example.component";
import {VariableService} from "../common/variable.service";
import {CallbackService} from "../service/callback.service";

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

  constructor(
    readonly variable: VariableService,
    private readonly callbackService: CallbackService
  ) { }

  ngOnInit(): void {
  }

  title(){
    let crumbs=this.variable.breadCrumbs();
    return `Test ${this.variable.selectedTopic?.name} Webhook`
  }

  test() {
    this.response?.invalidate()
    this.callbackService.testCallback(this.callback.request)
      .subscribe(it => {
        this.response?.update(it)
      })
  }
}
