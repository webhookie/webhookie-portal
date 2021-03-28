import {Component, OnInit} from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";
import {SubscriptionService} from "../subscription.service";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  readonly _subscriptions$: Subject<Subscription[]> = new ReplaySubject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(map(it => it.role))
      .pipe(mergeMap( it => this.service.fetchSubscriptions(it)))
      .subscribe( it => this._subscriptions$.next(it));
  }

}
