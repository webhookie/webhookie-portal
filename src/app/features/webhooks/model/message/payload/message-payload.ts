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

import * as sampler from "@asyncapi/react-component/lib/helpers/generateExampleSchema";
import {EnumPayload} from "./message-payload-factory";

export abstract class MessagePayload {
  private static readonly FILTERED_ITEMS = [
    "properties", "minimum", "maximum", "x-parser-schema-id", "type", "description", "format", "required", "items"
  ]

  abstract readonly nestedObjects: Array<MessagePayload>

  readonly properties: PayloadProperties = {};
  readonly keys: Array<string>

  abstract type(): string;

  isEnum(): boolean {
    return this instanceof EnumPayload;
  }

  value(key: string) {
    return this.json[key]
  }

  values() {
  }

  example(): any {
    return sampler.generateExampleSchema(this.json)
  }

  get description() {
    return this.json.description
  }

  get format() {
    return this.json.format
      ? this.json.format
      : this.json.pattern
  }

  protected constructor(
    readonly name: string,
    readonly isRequired: boolean,
    readonly json: any
  ) {
    this.keys = Object.keys(this.json)
      .filter(it => MessagePayload.FILTERED_ITEMS.indexOf(it) == -1)
  }
}

export enum PayloadType {
  OBJECT = "object",
  ARRAY = "array",
  ENUM = "enum"
}

export interface PayloadProperties {
  [key: string]: MessagePayload;
}

