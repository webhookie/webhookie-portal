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
}
