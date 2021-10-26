/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
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

import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../../../shared/model/table/column/context-menu-item";
import {WebhookApi} from "../../../model/webhook-api";
import {ApplicationContext} from "../../../../../shared/application.context";
import {WebhooksContext} from "../../../webhooks-context";
import {RouterService} from "../../../../../shared/service/router.service";
import {WebhookApiService} from "../../../service/webhook-api.service";
import {AuthService} from "../../../../../shared/service/auth.service";
import {HealthService} from "../../../../../shared/service/health.service";
import {Observable} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
import {ModalService} from "../../../../../shared/service/modal.service";
import {FileService} from "../../../../../shared/service/file.service";

type WebhookApiContextMenu = ContextMenuItem<WebhookApi, WebhookMenu>

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.css']
})
export class WebhookComponent implements OnInit {
  menuItems: Array<ContextMenuItem<WebhookApi, WebhookMenu>> = [];
  deletingWebhookApi?: WebhookApi

  @ViewChild("deleteWebhookApiConfirmDialogTemplate") deleteWebhookApiConfirmDialogTemplate!: TemplateRef<any>;
  @ViewChild("deleteWebhookApiInfoDialogTemplate") deleteWebhookApiInfoDialogTemplate!: TemplateRef<any>;

  get data() {
    return this.webhooksContext.group
  }

  constructor(
    private readonly modalService: ModalService,
    private readonly fileService: FileService,
    private readonly authService: AuthService,
    private readonly healthService: HealthService,
    private readonly routeService: RouterService,
    private readonly appContext: ApplicationContext,
    private readonly webhookApiService: WebhookApiService,
    private readonly webhooksContext: WebhooksContext
  ) {
  }

  ngOnInit(): void {
    this.webhooksContext.group$
      .subscribe(() => {
        this.menuItems = this.createContextMenuItems();
      })
  }

  get healthy(): Observable<boolean> {
    return this.healthService.healthy$
  }

  get isLoggedIn(): boolean {
    return this.appContext.isLoggedIn
  }

  login() {
    this.authService.login();
  }

  private createContextMenuItems() {
    return [
      ContextMenuItemBuilder
        .create<WebhookApi, WebhookMenu>(WebhookMenu.EDIT)
        .handler(this.editWebhookApi())
        .isAvailable(this.canEditWebhookApi())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookApi, WebhookMenu>(WebhookMenu.SPEC)
        .handler(this.downloadSpec())
        .isAvailable(this.canViewSpec())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookApi, WebhookMenu>(WebhookMenu.DELETE)
        .handler(this.deleteWebhookApi())
        .isAvailable(this.canEditWebhookApi())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookApi, WebhookMenu>(WebhookMenu.VIEW_YOUR_SUBSCRIPTIONS)
        .handler(this.viewYourSubscriptions())
        .isAvailable(this.canViewYourSubscriptions())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookApi, WebhookMenu>(WebhookMenu.VIEW_ALL_SUBSCRIPTIONS)
        .handler(this.viewAllSubscriptions())
        .isAvailable(this.canViewAllSubscriptions())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookApi, WebhookMenu>(WebhookMenu.VIEW_TRACES)
        .handler(this.viewWebhookTraffic())
        .isAvailable(this.canViewWebhookTraffic())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookApi, WebhookMenu>(WebhookMenu.VIEW_SPANS)
        .handler(this.viewSubscriptionTraffic())
        .isAvailable(this.canViewSubscriptionTraffic())
        .build(),
    ];
  }

  navigateTo(uri: string) {
    this.routeService
      .navigateTo(uri, {
        topic: this.webhooksContext.selectedTopic?.name
      })
  }

  editWebhookApi(): (it: WebhookApi, item: WebhookApiContextMenu) => any {
    return (it) => {
      this.webhookApiService.fetchById(it.id)
        .subscribe(group => {
          this.webhooksContext.editingGroup(group)
          this.routeService
            .navigateTo("/webhooks/edit-webhook-api")
        })
    }
  }

  downloadSpec(): (it: WebhookApi, item: WebhookApiContextMenu) => any {
    return (it) => {
      this.webhookApiService.fetchById(it.id)
        .subscribe(group => this.fileService.downloadText(group.spec, `${group.title}.yaml`))
    }
  }

  cancelDelete() {
    this.modalService.hide()
  }

  performDelete() {
    this.webhookApiService.delete(this.deletingWebhookApi!)
      .pipe(tap(() => this.modalService.hide()))
      .pipe(mergeMap(() => this.webhookApiService.myWebhookApis()))
      .subscribe(() => this.routeService.navigateTo("/webhooks"))
  }

  confirmDeleteApiMessage(): string {
    return `Are you sure you want to delete ${this.deletingWebhookApi?.title} with ${this.deletingWebhookApi?.webhooks?.length} webhooks?`
  }

  confirmDeleteApiTitle(): string {
    return `Delete ${this.deletingWebhookApi?.title} ?`
  }

  deleteWebhookApi(): (it: WebhookApi, item: WebhookApiContextMenu) => any {
    return (it) => {
      if(it.numberOfSubscriptions > 0) {
        this.modalService.open(this.deleteWebhookApiInfoDialogTemplate);
      } else {
        this.deletingWebhookApi = it
        this.modalService.open(this.deleteWebhookApiConfirmDialogTemplate);
      }
    }
  }

  viewYourSubscriptions(): (it: WebhookApi, item: WebhookApiContextMenu) => any {
    return () => {
      this.navigateTo("subscriptions/consumer")
    }
  }

  viewAllSubscriptions(): (it: WebhookApi, item: WebhookApiContextMenu) => any {
    return () => {
      this.navigateTo("subscriptions/provider")
    }
  }

  viewWebhookTraffic(): (it: WebhookApi, item: WebhookApiContextMenu) => any {
    return () => {
      this.navigateTo("traffic/webhook")
    }
  }

  viewSubscriptionTraffic(): (it: WebhookApi, item: WebhookApiContextMenu) => any {
    return () => {
      this.navigateTo("traffic/subscription")
    }
  }

  canEditWebhookApi(): (it: WebhookApi) => boolean {
    return (it?: WebhookApi) => {
      if(it) {
        return this.appContext.hasProviderAccess(it.providerGroups);
      }

      return false;
    }
  }

  canViewSpec(): (it: WebhookApi) => boolean {
    return () => {
      return true;
    }
  }

  canViewYourSubscriptions(): (it: WebhookApi) => boolean {
    return () => this.appContext.hasConsumerRole;
  }

  canViewAllSubscriptions(): (it?: WebhookApi) => boolean {
    return (it?: WebhookApi) => {
      if(it) {
        return this.appContext.hasProviderAccess(it.providerGroups);
      }

      return false;
    }
  }

  canViewWebhookTraffic(): (it?: WebhookApi) => boolean {
    return (it?: WebhookApi) => {
      if(it) {
        return this.appContext.hasProviderAccess(it.providerGroups) || this.appContext.hasAdminRole
      }

      return false;
    }
  }

  canViewSubscriptionTraffic(): (it: WebhookApi) => boolean {
    return () => this.appContext.hasConsumerRole;
  }
}

enum WebhookMenu {
  EDIT = "Edit",
  SPEC = "Download Spec",
  DELETE = "Delete",
  VIEW_YOUR_SUBSCRIPTIONS = "Your Subscriptions",
  VIEW_ALL_SUBSCRIPTIONS = "All Subscriptions",
  VIEW_TRACES = "Webhook Traffic",
  VIEW_SPANS = "Subscription Traffic",
}
