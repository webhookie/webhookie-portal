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
    let content = `<a class="text-primary" title="${data.callback.url}">${data.callback.name}</a>`;
    if(data.callback.signable) {
      content = `${content} [${data.callback.security?.method}]`
    }
    return content;
  }
}

export class SubscriptionStatusColumn extends BaseTableColumn<Subscription>{
  value(data: Subscription): string {
    return `<h5><span class="${SubscriptionColumnUtils.classByStatus(data)} font-weight-bold">${data.statusUpdate.status}</span></h5>`;
  }

  clazz = "text-left"
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
