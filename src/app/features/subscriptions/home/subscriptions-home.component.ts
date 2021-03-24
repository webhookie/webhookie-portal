import {Component, OnInit} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Subscription} from "../../../shared/model/subscription";
import {SubscriptionService} from "../subscription.service";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-subscriptions-home',
  templateUrl: './subscriptions-home.component.html',
  styleUrls: ['./subscriptions-home.component.css']
})
export class SubscriptionsHomeComponent implements OnInit {
  private readonly DISABLED_STYLE = "disabled";
  private readonly CONSUMER_ROLE = "CONSUMER";
  private readonly PROVIDER_ROLE = "PROVIDER";

  private readonly _subscriptions$: Subject<Subscription[]> = new ReplaySubject();
  public readonly subscriptions$: Observable<Subscription[]> = this._subscriptions$.asObservable();
  private readonly _role$: Subject<string> = new ReplaySubject();
  private readonly role$: Observable<string> = this._role$.asObservable();
/*
  displayedColumns: string[] = ["entity", "application", "topic", "url", "status"];
  dataSource = new MatTableDataSource<Subscription>();
*/
  consumerButtonStyle: string = this.DISABLED_STYLE;
  providerButtonStyle: string = "";

  constructor(
    private readonly service: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.role$
      .pipe(mergeMap(it => this.service.mySubscriptions(it)))
      .subscribe(it => this._subscriptions$.next(it))
    this._role$.next(this.CONSUMER_ROLE)
/*
    this.service.mySubscriptions()
      .subscribe(it => this.dataSource.data = it)
*/
  }

  asConsumer() {
    this._role$.next(this.CONSUMER_ROLE)
    this.consumerButtonStyle = this.DISABLED_STYLE
    this.providerButtonStyle = ""
  }

  asProvider() {
    this._role$.next(this.PROVIDER_ROLE)
    this.consumerButtonStyle = ""
    this.providerButtonStyle = this.DISABLED_STYLE
  }
}
