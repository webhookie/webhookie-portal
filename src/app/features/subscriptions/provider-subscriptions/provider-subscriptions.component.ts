import { Component, OnInit } from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";
import {SubscriptionService} from "../subscription.service";

@Component({
  selector: 'app-provider-subscriptions',
  templateUrl: './provider-subscriptions.component.html',
  styleUrls: ['./provider-subscriptions.component.css']
})
export class ProviderSubscriptionsComponent implements OnInit {
  private readonly _subscriptions$: Subject<Subscription[]> = new ReplaySubject();

  constructor(
    private readonly service: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.service.myWebhookSubscriptions()
      .subscribe( it => this._subscriptions$.next(it));
  }

  subscriptions$(): Observable<Array<Subscription>> {
    return this._subscriptions$.asObservable();
  }
}
