/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import {switchMap, take} from "rxjs/operators";
import {WebhookApiForm} from "./webhook-api-form";
import {WebhookieError} from "../../../../shared/error/webhookie-error";
import {WebhookAccessGroupComponent} from "./webhook-access-group/webhook-access-group.component";
import {DropdownEntry} from "../../../../shared/model/dropdownEntry";
import {ApplicationContext} from "../../../../shared/application.context";
import {Observable} from "rxjs";
import {WebhookApi} from "../../model/webhook-api";

@Component({
  selector: 'app-webhook-form',
  templateUrl: './webhook-form.component.html',
  styleUrls: ['./webhook-form.component.css']
})
export class WebhookFormComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'yaml'};

  error: WebhookieError | null = null;
  isCollapsed: boolean = true;

  @ViewChild("consumerGroupsComponent") consumerGroupsComponent!: WebhookAccessGroupComponent
  @ViewChild("providerGroupsComponent") providerGroupsComponent!: WebhookAccessGroupComponent
  @Input() webhookForm!: WebhookApiForm;
  @Input() formTitle!: string
  @Input() onSave!: (request: any) => Observable<WebhookApi>
  @Input() onSuccess!: (value: WebhookApi) => void;

  constructor(
    private readonly appCtx: ApplicationContext,
  ) { }

  ngOnInit(): void {
    this.webhookForm.form.statusChanges
      .subscribe(it => {
        if(it == "INVALID") {
          this.updateError(this.webhookForm.errors());
        } else {
          this.clearError();
        }
      });

    this.webhookForm.form.valueChanges
      .pipe(take(1))
      .subscribe(() => {
        this.providerGroupsComponent.init(this.webhookForm.providerGroups.value)
        this.consumerGroupsComponent.init(this.webhookForm.consumerGroups.value)
      });
  }

  get specCode(): string {
    return this.webhookForm.spec.value;
  }

  save($event: MouseEvent) {
    this.clearError();
    this.webhookForm.value()
      .pipe(switchMap(it => this.onSave(it)))
      .subscribe(
        it => this.onSuccess(it),
        (err: WebhookieError) => this.updateError(err)
      );
    $event.preventDefault();
  }

  title(){
    return this.formTitle ?  this.formTitle : ""
  }

  updateError(err: WebhookieError | null) {
    this.error = err;
    this.isCollapsed = false;
  }

  clearError() {
    this.error = null;
    this.isCollapsed = true;
  }

  providerGroupFilter(): (entry: DropdownEntry) => boolean {
    return this.appCtx.providerGroupFilter();
  }
}
