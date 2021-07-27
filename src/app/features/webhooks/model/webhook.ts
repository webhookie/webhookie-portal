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

import {Channel, Message} from "@asyncapi/parser/dist/bundle";
import {Topic} from "./webhook-api";
import {MessageHeaders} from "./message-headers";
import {WebhookType} from "./webhook-type";
import {MessagePayload} from "./message/payload/message-payload";
import {MessagePayloadFactory} from "./message/payload/message-payload-factory";

export class Webhook {
  private readonly _message: Message
  readonly example: any;
  readonly headers: MessageHeaders = new MessageHeaders();
  readonly payload: MessagePayload;
  readonly contentType?: string;

  constructor(
    public id: string,
    public topic: Topic,
    public numberOfSubscriptions: number,
    public type: WebhookType = WebhookType.SUBSCRIBE,
    public channel: Channel,
    _defaultContentType: string | null
  ) {
    this._message = this.type == WebhookType.SUBSCRIBE
      ? this.channel.subscribe().message()
      : this.channel.publish().message()

    let payload = this._message.payload();
    this.payload = MessagePayloadFactory.create("Body", false, payload.json())

    let examples = payload.examples();
    // @ts-ignore
    this.example = examples ? examples : this.payload.example()

    if(this._message.contentType() != undefined) {
      this.contentType = this._message.contentType();
    } else if(_defaultContentType != null) {
      this.contentType = _defaultContentType!
    }

    let messageHeaders = this._message.headers() ? this._message.headers().json().properties : {}
    this.headers = new MessageHeaders(messageHeaders);
    if(this.contentType) {
      this.headers.setContentType(this.contentType);
    }
  }

  get hasHeaders(): boolean {
    return this.headers.hasHeaders;
  }

  contentTypeHeader(): any {
    if(this.contentType) {
      return {
        "Content-Type": this.contentType
      };
    }

    return {};
  }
}

