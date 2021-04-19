import {BaseTableColumn} from "../../../shared/model/table/column/table-column";
import {Subscription} from "../../../shared/model/subscription";

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
    return data.statusUpdate.status;
  }
}
