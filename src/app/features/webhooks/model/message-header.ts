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
import {Constants} from "../../../shared/constants";

export class MessageHeader {
  static readonly readOnlyHeaders = [
    Constants.HEADER_AUTHORIZATION,
    Constants.HEADER_CONTENT_TYPE,
    Constants.HEADER_ACCEPT
  ]

  readonly props: Array<string> = Object.keys(this._props)
    .filter(it => it != "x-parser-schema-id");

  value(name: string): any {
    return this._props[name];
  }

  description(): any {
    return this.value("description")
  }

  format(): any {
    return this.value("format")
  }

  type(): any {
    return this.value("type")
  }

  example(): any {
    return sampler.generateExampleSchema(this._props)
  }

  constructor(
    public readonly name: string,
    private readonly _props: any
  ) {
  }

  isEditable(): boolean {
    return MessageHeader.readOnlyHeaders.indexOf(this.name) == -1
  }

  isReadOnly(): boolean {
    return !this.isEditable();
  }

  headerValue(): any {
    if(this.example()) {
      return this.example()
    }

    return this.placeHolder()
  }

  placeHolder() {
    if(this.format()) {
      return this.format()
    }

    if(this.type()) {
      return this.type()
    }
  }
}
