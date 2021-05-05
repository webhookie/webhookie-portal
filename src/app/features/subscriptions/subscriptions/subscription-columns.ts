import {BaseTableColumn} from "../../../shared/model/table/column/table-column";
import {Subscription, SubscriptionStatus} from "../../../shared/model/subscription";

export class SubscriptionEntityColumn extends BaseTableColumn<Subscription>{
  value(data: Subscription): string {
    return data.application.entity;
  }
}

export class SubscriptionApplicationColumn extends BaseTableColumn<Subscription>{
  value(data: Subscription): string {
    return data.application.name;
  }
}

export class SubscriptionWebhookColumn extends BaseTableColumn<Subscription>{
  value(data: Subscription): string {
    return data.topic;
  }
}

export class SubscriptionCallbackColumn extends BaseTableColumn<Subscription>{
  value(data: Subscription): string {
    return `<a class="text-primary" title="${data.callback.url}">${data.callback.name}</a>`;
  }
}

export class SubscriptionStatusColumn extends BaseTableColumn<Subscription>{
  value(data: Subscription): string {
    return `<h5><span class="${SubscriptionColumnUtils.classByStatus(data)} font-weight-bold">${data.statusUpdate.status}</span></h5>`;
  }

  clazz = "text-center"
}

class SubscriptionColumnUtils {
  static classByStatus(subscription: Subscription): string {
    let clazz;
    switch (subscription.statusUpdate.status) {
      case SubscriptionStatus.SAVED:
        clazz = "dark";
        break;
      case SubscriptionStatus.VALIDATED:
        clazz = "primary";
        break;
      case SubscriptionStatus.ACTIVATED:
        clazz = "success";
        break;
      case SubscriptionStatus.DEACTIVATED:
        clazz = "warning";
        break;
      case SubscriptionStatus.BLOCKED:
        clazz = "danger";
        break;
      case SubscriptionStatus.SUSPENDED:
        clazz = "danger";
        break;
      default:
        clazz = "dark";
        break;
    }

    return `badge badge-pill badge-${clazz} border-radius`;
  }
}
