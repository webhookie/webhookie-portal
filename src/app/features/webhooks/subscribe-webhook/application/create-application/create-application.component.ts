import {Component, OnInit, ViewChild} from '@angular/core';
import {WebhookieService} from "../../../../../shared/service/webhookie.service";
import {ApplicationService, CreateApplicationRequest} from "../../../service/application.service";
import {WebhooksContext} from "../../../webhooks-context";
import {Application} from "../../../model/application";
import {WebhookieError} from "../../../../../shared/error/webhookie-error";
import {DuplicateEntityError} from "../../../../../shared/error/duplicate-entity-error";
import {BadRequestError} from "../../../../../shared/error/bad-request-error";
import {ModalService} from "../../../../../shared/service/modal.service";
import {SubscriptionContext} from "../../subscription-context";
import {DropdownEntry} from "../../../../../shared/model/dropdownEntry";
import {MultiSelectComponent} from "../../../../../shared/components/multi-select/multi-select.component";

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {
  @ViewChild("groupsComponent") groupsComponent!: MultiSelectComponent

  groups: Array<DropdownEntry> = [];

  requestedName: string = ""
  requestedDesc?: string

  constructor(
    private readonly service: ApplicationService,
    private readonly webhookieService: WebhookieService,
    private readonly context: WebhooksContext,
    private readonly subscriptionContext: SubscriptionContext,
    public modalService: ModalService
  ) {
    this.webhookieService.fetchConsumerGroups()
      .subscribe(list => {
        this.groups = list.map(it => new DropdownEntry(it.iamGroupName, it.name))
      });
  }

  ngOnInit(): void {
  }

  createApplication() {
    let request: CreateApplicationRequest = {
      name: this.requestedName,
      description: this.requestedDesc,
      consumerGroups: Array.from(this.groupsComponent.selectedItems).map(it => it.key)
    }

    let successHandler = (app: Application) => {
      this.subscriptionContext.applicationCreated(app);
      this.modalService.hide();
    };

    let errorHandler = (error: WebhookieError) => {
      let message = error.message;
      if(error.name == DuplicateEntityError.name) {
        // noinspection JSUnusedAssignment
        message = "Duplicate application name! please choose another name"
      } else if(error.name == BadRequestError.name) {
        // noinspection JSUnusedAssignment
        message = "Request is missing name or consumer groups. please make sure to add at least 1 Consumer Group"
      }
      // this.alertService.error(message);
    };

    this.service.createApplication(request)
      .subscribe(successHandler, errorHandler)
  }
}
