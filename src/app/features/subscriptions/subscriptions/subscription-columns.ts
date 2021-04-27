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
    return `<span class="${SubscriptionColumnUtils.classByStatus(data)} font-weight-bold">${data.statusUpdate.status}</span>`;
  }

  clazz = "text-center"
}

class SubscriptionColumnUtils {
  static classByStatus(subscription: Subscription): string {
    switch (subscription.statusUpdate.status) {
      case SubscriptionStatus.SAVED:
        return "text-default";
      case SubscriptionStatus.VALIDATED:
        return "text-primary";
      case SubscriptionStatus.ACTIVATED:
        return "text-success";
      case SubscriptionStatus.DEACTIVATED:
        return "text-warning";
      case SubscriptionStatus.BLOCKED:
        return "text-danger";
      case SubscriptionStatus.SUSPENDED:
        return "text-danger";
      default:
        return "text-default";
    }
  }
}
