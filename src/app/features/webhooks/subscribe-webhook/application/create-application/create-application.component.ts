import {Component, OnInit} from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import {BehaviorSubject, Observable} from "rxjs";
import {ConsumerGroup} from "../../../../../shared/model/consumer-group";
import {WebhookieService} from "../../../../../shared/webhookie.service";
import {map} from "rxjs/operators";
import {ApplicationService, CreateApplicationRequest} from "../../../service/application.service";
import {WebhooksContext} from "../../../webhooks-context";

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {
  // @ts-ignore
  readonly _consumerGroups$: BehaviorSubject<Array<ConsumerGroup>> = new BehaviorSubject([]);

  // @ts-ignore
  readonly _selectedGroups$: BehaviorSubject<Array<ConsumerGroup>> = new BehaviorSubject([]);

  requestedName: string = ""
  requestedDesc?: string

  constructor(
    private readonly service: ApplicationService,
    private readonly webhookieService: WebhookieService,
    private readonly context: WebhooksContext,
    public variable: VariableService
  ) {
    this.webhookieService.fetchConsumerGroups()
      .subscribe(it => this._consumerGroups$.next(it));
  }

  ngOnInit(): void {
  }

  createApplication() {
    let request: CreateApplicationRequest = {
      name: this.requestedName,
      description: this.requestedDesc,
      consumerGroups: this._selectedGroups$.value.map(it => it.iamGroupName)
    }

    this.service.createApplication(request)
      .subscribe(it => {
        console.warn(it);
        this.context.updateApplication(it);
        this.variable.modalRef.hide();
      })
  }

  isGroupSelected$(group: ConsumerGroup): Observable<boolean> {
    return this._selectedGroups$.asObservable()
      .pipe(
        map((list: Array<ConsumerGroup>) => list.indexOf(group)),
        map(it => it != -1)
      )
  }

  selectAll() {
    this._consumerGroups$.asObservable()
      .subscribe(it => this._selectedGroups$.next(it));
  }

  isAllSelected() {
    let selectedGroups = this._selectedGroups$.value;
    let allGroups = this._consumerGroups$.value;

    return selectedGroups === allGroups;
  }

  selectGroup(group: ConsumerGroup) {
    let newValue = this._selectedGroups$.value
    if (newValue.indexOf(group) == -1) {
      newValue.push(group);
    }
    this._selectedGroups$.next(newValue);
  }

  handleEvent(event: Event) {
    // @ts-ignore
    if (event.target?.checked) {
      console.warn("CHECKED")
    } else {
      console.log("!!!!!!!!!!")
    }
    /*
        this.isGroupSelected$(group)
          .pipe(
            tap(it => {
              if(it) {
                this.removeGroup(group)
              } else {
                this.selectGroup(group)
              }
            })
          )
    */
  }

  removeGroup(group: ConsumerGroup) {
    let oldValue = this._selectedGroups$.value;
    let newValue = oldValue.filter(it => it.id != group.id)
    this._selectedGroups$.next(newValue);
  }
}