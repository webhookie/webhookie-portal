import {Component, Input, OnInit} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  // @ts-ignore
  @Input("subs") subscriptions$: Observable<Subscription[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
