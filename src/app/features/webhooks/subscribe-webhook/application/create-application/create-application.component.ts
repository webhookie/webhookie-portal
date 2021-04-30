import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ConsumerGroup} from "../../../../../shared/model/consumer-group";
import {WebhookieService} from "../../../../../shared/service/webhookie.service";
import {map} from "rxjs/operators";
import {ApplicationService, CreateApplicationRequest} from "../../../service/application.service";
import {WebhooksContext} from "../../../webhooks-context";
import {Application} from "../../../model/application";
// import {ToastrService} from "ngx-toastr";
import {WebhookieError} from "../../../../../shared/error/webhookie-error";
import {DuplicateEntityError} from "../../../../../shared/error/duplicate-entity-error";
import {BadRequestError} from "../../../../../shared/error/bad-request-error";
import {ModalService} from "../../../../../shared/service/modal.service";

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
    // private readonly alertService: ToastrService,
    public modalService: ModalService
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

    let successHandler = (app: Application) => {
      this.context.applicationCreated(app);
      this.modalService.hide();
    };

    let errorHandler = (error: WebhookieError) => {
      let message = error.message;
      if(error.name == DuplicateEntityError.name) {
        message = "Duplicate application name! please choose another name"
      } else if(error.name == BadRequestError.name) {
        message = "Request is missing name or consumer groups. please make sure to add at least 1 Consumer Group"
      }
      // this.alertService.error(message);
    };

    this.service.createApplication(request)
      .subscribe(successHandler, errorHandler)
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
