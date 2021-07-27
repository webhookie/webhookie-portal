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

export class Constants {
  static readonly STORAGE_KEY_CALLBACK = "STORAGE_KEY_CALLBACK";
  static readonly AUTH_EVENT_TOKEN_REFRESHED = "token_refreshed";
  static readonly ROUTE_HOME = "/";
  static readonly ROUTE_WELCOME = "webhooks";

  static readonly ROLE_WH_CONSUMER = "WH_CONSUMER";
  static readonly ROLE_WH_ADMIN = "WH_ADMIN";
  static readonly ROLE_WH_PROVIDER = "WH_PROVIDER";

  static readonly SUBSCRIPTIONS_VIEW_ROLE_CONSUMER = "CONSUMER"
  static readonly SUBSCRIPTIONS_VIEW_ROLE_PROVIDER = "PROVIDER"

  static readonly CONTENT_TYPE_APPLICATION_JSON = "application/json"
  static readonly HEADER_CONTENT_TYPE = "Content-Type"
  static readonly HEADER_AUTHORIZATION = "Authorization"
  static readonly HEADER_ACCEPT = "Accept"

  static readonly CSS_PRIMARY_COLOR = "var(--primary-color)"
  // noinspection JSUnusedGlobalSymbols
  static readonly CSS_PRIMARY_DARK_COLOR = "var(--primary-dark-color)"
  // noinspection JSUnusedGlobalSymbols
  static readonly CSS_SECONDARY_COLOR = "var(--secondary-color)";
  // noinspection JSUnusedGlobalSymbols
  static readonly CSS_BACKGROUND_COLOR = "var(--background-color)";
  // noinspection JSUnusedGlobalSymbols
  static readonly CSS_PRIMARY_TEXT_COLOR = "var(--primary-text-color)";

  static readonly HEADER_HIDE_LOADING_KEY = "HEADER_HIDE_LOADING_KEY"
  static readonly HEADER_HIDE_LOADING = {
    HEADER_HIDE_LOADING_KEY: "true"
  }
}
