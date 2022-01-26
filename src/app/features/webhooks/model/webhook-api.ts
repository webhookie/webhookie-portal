/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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

import {TableDetailData} from "../../../shared/model/table/table-detail-data";
import {ConsumerAccess, ProviderAccess} from "../../../shared/model/access-group";
import {Webhook} from "./webhook";
import {AsyncAPIDocument, SecurityScheme} from "@asyncapi/parser/dist/bundle";
import {WebhookType} from "./webhook-type";
import {StringUtils} from "../../../shared/string-utils";
import {User} from "../../../shared/model/user";
import {ArrayUtils} from "../../../shared/array-utils";
import {Optional} from "../../../shared/model/optional";

export class WebhookApi extends TableDetailData {
  private readonly _securityOptions: Array<SecurityOption> = [];

  get securityOptions() {
    return this._securityOptions
      .filter(it => it.type == "symmetricEncryption");
  }

  get webhooks(): Array<Webhook> {
    return this._webhooks
      .filter(it => it.type == WebhookType.SUBSCRIBE)
  }

  get numberOfSubscriptions(): number {
    return this.webhooks.map(it => it.numberOfSubscriptions)
      .reduce((value: number, current: number) => {
        return value + current;
      });
  }

  isAccessibleFor(user: User): boolean {
    return ArrayUtils.intersect(user.providerGroups, this.providerGroups).length > 0 ||
      this.providerAccess == ProviderAccess.ALL
  }

  constructor(
    public id: string,
    public title: string,
    public approvalDetails: WebhookApiApprovalDetails,
    public version: string,
    public description: string,
    public spec: string,
    private _webhooks: Array<Webhook>,
    public consumerAccess: ConsumerAccess,
    public consumerGroups: Array<string>,
    public providerAccess: ProviderAccess,
    public providerGroups: Array<string>,
    public info: WebhookApiInfo,
    doc: AsyncAPIDocument
  ) {
    super();

    let components = doc.components();
    this._securityOptions = Object.keys(components.securitySchemes())
      .map(name => SecurityOption.create(name, components.securityScheme(name)))
  }

  get hasSecuritySchema(): boolean {
    return this.securityOptions.length > 0
  }

  static create(item: any, webhooks: Array<Webhook>, doc: AsyncAPIDocument): WebhookApi {
    let license = doc.info().license();
    let info: WebhookApiInfo = {
      termsOfService: doc.info().termsOfService(),
      license: {
        name: license?.name(),
        url: license?.url()
      }
    }

    let approvalDetails: WebhookApiApprovalDetails = {
      required: item.approvalDetails.required,
      email: item.approvalDetails.email
    }
    return new WebhookApi(
      item.id,
      item.title,
      approvalDetails,
      item.webhookVersion,
      item.description,
      item.raw,
      webhooks,
      item.consumerAccess,
      item.consumerGroups,
      item.providerAccess,
      item.providerGroups,
      info,
      doc
    );
  }

  matches(phrase: string): boolean {
    if(StringUtils.matchesIn(this.title, phrase)) {
      return true;
    }

    return this.webhooks.map(it => it.topic)
      .some(it => it.matches(phrase))
  }
}

export class Topic {
  constructor(
    public name: string,
    public description: string
  ) {
  }

  matches(value: string): boolean {
    return StringUtils.matchesIn(this.name, value);
  }
}

export class SecurityOption {
  constructor(
    public name: string,
    public properties: any,
    public type: any,
    public description: string | null,
  ) {
  }

  static create(name: string, schema: SecurityScheme): SecurityOption {
    return new SecurityOption(
      name,
      schema.json(),
      schema.type(),
      schema.description()
    )
  }
}

export interface WebhookApiInfo {
  termsOfService?: string
  license?: WebhookApiLicense
}

export interface WebhookApiLicense {
  name: string,
  url: string
}

export interface WebhookApiApprovalDetails {
  required: boolean,
  email: Optional<string>
}

