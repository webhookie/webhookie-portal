import {Component, OnInit} from '@angular/core';
import {ContextMenuItem} from "../../../../../shared/model/table/column/context-menu-item";
import {WebhookGroup} from "../../../model/webhook-group";
import {ApplicationContext} from "../../../../../shared/application.context";
import {WebhooksContext} from "../../../webhooks-context";
import {RouterService} from "../../../../../shared/service/router.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  menuItems: Array<ContextMenuItem<WebhookGroup, WebhookMenu>> = [
    new ContextMenuItem<WebhookGroup, WebhookMenu>(WebhookMenu.EDIT, this.editWebhookGroup(), this.canEditWebhookGroup()),
    new ContextMenuItem<WebhookGroup, WebhookMenu>(WebhookMenu.VIEW_YOUR_SUBSCRIPTIONS, this.viewYourSubscriptions(), this.canViewYourSubscriptions()),
    new ContextMenuItem<WebhookGroup, WebhookMenu>(WebhookMenu.VIEW_ALL_SUBSCRIPTIONS, this.viewAllSubscriptions(), this.canViewAllSubscriptions()),
    new ContextMenuItem<WebhookGroup, WebhookMenu>(WebhookMenu.VIEW_TRACES, this.viewWebhookTraffic(), this.canViewWebhookTraffic()),
    new ContextMenuItem<WebhookGroup, WebhookMenu>(WebhookMenu.VIEW_SPANS, this.viewSubscriptionTraffic(), this.canViewSubscriptionTraffic()),
  ]

  get data(): WebhookGroup | undefined{
    return this.webhooksContext.selectedWebhook?.webhookGroup
  }

  constructor(
    private readonly router: Router,
    private readonly routeService: RouterService,
    private readonly appContext: ApplicationContext,
    private readonly webhooksContext: WebhooksContext
  ) {
  }

  ngOnInit(): void {
  }

  navigateTo(uri: string) {
    this.router
      .navigate([uri], {
        queryParams: {
          topic: this.webhooksContext.selectedTopic?.name
        }
      })
      .then()
  }

  editWebhookGroup(): (it: WebhookGroup, action: WebhookMenu) => any {
    return (it, action) => {
      console.warn(`${action} ==> ${it.id}`);
    }
  }

  viewYourSubscriptions(): (it: WebhookGroup, action: WebhookMenu) => any {
    return () => {
      this.navigateTo("subscriptions/consumer")
    }
  }

  viewAllSubscriptions(): (it: WebhookGroup, action: WebhookMenu) => any {
    return () => {
      this.navigateTo("subscriptions/provider")
    }
  }

  viewWebhookTraffic(): (it: WebhookGroup, action: WebhookMenu) => any {
    return () => {
      this.navigateTo("traffic/webhook")
    }
  }

  viewSubscriptionTraffic(): (it: WebhookGroup, action: WebhookMenu) => any {
    return () => {
      this.navigateTo("traffic/subscription")
    }
  }

  canEditWebhookGroup(): (it: WebhookGroup) => boolean {
    return () => this.appContext.hasProviderRole;
  }

  canViewYourSubscriptions(): (it: WebhookGroup) => boolean {
    return () => this.appContext.hasProviderRole || this.appContext.hasConsumerRole;
  }

  canViewAllSubscriptions(): (it: WebhookGroup) => boolean {
    return () => this.appContext.hasProviderRole;
  }

  canViewWebhookTraffic(): (it: WebhookGroup) => boolean {
    return () => this.appContext.hasProviderRole;
  }

  canViewSubscriptionTraffic(): (it: WebhookGroup) => boolean {
    return () => this.appContext.hasProviderRole || this.appContext.hasConsumerRole;
  }

  handle(menuItem: ContextMenuItem<WebhookGroup, WebhookMenu>) {
    let webhookGroup = this.webhooksContext.selectedWebhook?.webhookGroup;
    if(webhookGroup) {
      menuItem.handler(webhookGroup, menuItem.item);
    }
  }
}

enum WebhookMenu {
  EDIT = "Edit",
  VIEW_YOUR_SUBSCRIPTIONS = "View Your Subscriptions",
  VIEW_ALL_SUBSCRIPTIONS = "View All Subscriptions",
  VIEW_TRACES = "View Webhook Traffic",
  VIEW_SPANS = "View Subscription Traffic",
}
