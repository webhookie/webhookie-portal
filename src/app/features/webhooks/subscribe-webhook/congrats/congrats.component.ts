import {Component} from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.css']
})
export class CongratsComponent {

  constructor(
    private readonly context: WebhooksContext
  ) {
  }

  get topic(): Observable<string> {
    return this.context.topic$
      .pipe(map(it => it.name))
  }
}
