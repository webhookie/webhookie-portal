import {Component, OnInit} from '@angular/core';
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../../../shared/model/table/column/context-menu-item";
import {WebhookGroup} from "../../../model/webhook-group";
import {ApplicationContext} from "../../../../../shared/application.context";
import {WebhooksContext} from "../../../webhooks-context";
import {RouterService} from "../../../../../shared/service/router.service";

type WebhookGroupContextMenu = ContextMenuItem<WebhookGroup, WebhookMenu>

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  menuItems: Array<ContextMenuItem<WebhookGroup, WebhookMenu>> = [];

  get data(): WebhookGroup | undefined{
    return this.webhooksContext.selectedWebhook?.webhookGroup
  }

  constructor(
    private readonly routeService: RouterService,
    private readonly appContext: ApplicationContext,
    private readonly webhooksContext: WebhooksContext
  ) {
  }

  ngOnInit(): void {
    this.webhooksContext._selectedWebhookGroup
      .subscribe(() => {
        this.menuItems = this.createContextMenuItems();
      })
  }

  private createContextMenuItems() {
    return [
      ContextMenuItemBuilder
        .create<WebhookGroup, WebhookMenu>(WebhookMenu.EDIT)
        .handler(this.editWebhookGroup())
        .isAvailable(this.canEditWebhookGroup())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookGroup, WebhookMenu>(WebhookMenu.VIEW_YOUR_SUBSCRIPTIONS)
        .handler(this.viewYourSubscriptions())
        .isAvailable(this.canViewYourSubscriptions())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookGroup, WebhookMenu>(WebhookMenu.VIEW_ALL_SUBSCRIPTIONS)
        .handler(this.viewAllSubscriptions())
        .isAvailable(this.canViewAllSubscriptions())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookGroup, WebhookMenu>(WebhookMenu.VIEW_TRACES)
        .handler(this.viewWebhookTraffic())
        .isAvailable(this.canViewWebhookTraffic())
        .build(),
      ContextMenuItemBuilder
        .create<WebhookGroup, WebhookMenu>(WebhookMenu.VIEW_SPANS)
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

  editWebhookGroup(): (it: WebhookGroup, item: WebhookGroupContextMenu) => any {
    return (it, item) => {
      console.warn(`${item.item} ==> ${it.id}`);
    }
  }

  viewYourSubscriptions(): (it: WebhookGroup, item: WebhookGroupContextMenu) => any {
    return () => {
      this.navigateTo("subscriptions/consumer")
    }
  }

  viewAllSubscriptions(): (it: WebhookGroup, item: WebhookGroupContextMenu) => any {
    return () => {
      this.navigateTo("subscriptions/provider")
    }
  }

  viewWebhookTraffic(): (it: WebhookGroup, item: WebhookGroupContextMenu) => any {
    return () => {
      this.navigateTo("traffic/webhook")
    }
  }

  viewSubscriptionTraffic(): (it: WebhookGroup, item: WebhookGroupContextMenu) => any {
    return () => {
      this.navigateTo("traffic/subscription")
    }
  }

  canEditWebhookGroup(): (it: WebhookGroup) => boolean {
    return () => this.appContext.hasProviderRole;
  }

  canViewYourSubscriptions(): (it: WebhookGroup) => boolean {
    return () => this.appContext.hasConsumerRole;
  }

  canViewAllSubscriptions(): (it: WebhookGroup) => boolean {
    return (it: WebhookGroup) => {
      return this.appContext.hasProviderAccess(it.providerGroups);
    }
  }

  canViewWebhookTraffic(): (it: WebhookGroup) => boolean {
    return (it: WebhookGroup) => this.appContext.hasProviderAccess(it.providerGroups)
      || this.appContext.hasAdminRole
  }

  canViewSubscriptionTraffic(): (it: WebhookGroup) => boolean {
    return () => this.appContext.hasConsumerRole;
  }
}

enum WebhookMenu {
  EDIT = "Edit",
  VIEW_YOUR_SUBSCRIPTIONS = "Your Subscriptions",
  VIEW_ALL_SUBSCRIPTIONS = "All Subscriptions",
  VIEW_TRACES = "Webhook Traffic",
  VIEW_SPANS = "Subscription Traffic",
}
