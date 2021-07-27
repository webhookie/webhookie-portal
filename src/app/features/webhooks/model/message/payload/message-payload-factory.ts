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

import { MessagePayload, PayloadType } from "./message-payload";

export class EnumPayload extends MessagePayload {
  readonly nestedObjects: Array<MessagePayload> = [];

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    super(name, isRequired, json);
  }

  type(): string {
    return this.json.type;
  }

  values(): Array<string> {
    return super.value(PayloadType.ENUM.valueOf())
      .map((it: any) => {
        if(typeof it === "string") {
          return '"' + it + '"'
        }

        return it
      })
  }

  value(key: string): any {
    if(key == PayloadType.ENUM.valueOf()) {
      return this.values();
    }
    return super.value(key);
  }
}

export class ArrayPayload extends MessagePayload {
  readonly nestedObjects: Array<MessagePayload> = [];

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    super(name, isRequired, json);
  }

  type(): string {
    return `${PayloadType.ARRAY.valueOf()} | ${this.json.items.type}`;
  }
}

export class ObjectPayload extends MessagePayload {
  readonly nestedObjects: Array<MessagePayload>

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any,
    props: any
  ) {
    super(name, isRequired, json);

    let requiredProperties = this.json.required ? this.json.required : [];
    Object.keys(props)
      .forEach(it => this.properties[it] = MessagePayloadFactory.create(it, requiredProperties.indexOf(it) > -1, props[it]))

    this.nestedObjects = Object.values(this.properties)
  }

  type(): string {
    return PayloadType.OBJECT.valueOf();
  }
}

export class ObjectArrayPayload extends ObjectPayload {
  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any,
    props: any
  ) {
    super(name, isRequired, json, props);
  }

  type(): string {
    return `${PayloadType.ARRAY.valueOf()} | ${this.json.items.type}`;
  }
}

export class PrimitivePayload extends MessagePayload {
  readonly nestedObjects: Array<MessagePayload> = [];

  constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    super(name, isRequired, json);
  }

  type(): string {
    return this.json.type;
  }
}

export class MessagePayloadFactory {
  static create(name: string, isRequired: boolean, json: any): MessagePayload {
    let type = json.type
    switch (type) {
      case PayloadType.OBJECT.valueOf():
        return new ObjectPayload(name, isRequired, json, json.properties);
      case PayloadType.ARRAY.valueOf():
        if (json.items.type == PayloadType.OBJECT.valueOf()) {
          return new ObjectArrayPayload(name, isRequired, json, json.items.properties);
        }
        return new ArrayPayload(name, isRequired, json);
      default:
        if (json.enum) {
          return new EnumPayload(name, isRequired, json);
        }
    }
    return new PrimitivePayload(name, isRequired, json);
  }
}
