import { Component, OnInit } from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";
import {SubscriptionService} from "../subscription.service";

@Component({
  selector: 'app-consumer-subscriptions',
  templateUrl: './consumer-subscriptions.component.html',
  styleUrls: ['./consumer-subscriptions.component.css']
})
export class ConsumerSubscriptionsComponent implements OnInit {
  private readonly _subscriptions$: Subject<Subscription[]> = new ReplaySubject();

  constructor(
    private readonly service: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.service.mySubscriptions()
      .subscribe( it => this._subscriptions$.next(it));
  }

  subscriptions$(): Observable<Array<Subscription>> {
    return this._subscriptions$.asObservable();
  }

}
