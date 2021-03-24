export class WebhookieConfig {
  constructor(
    public iam: IAMConfig
  ) {
  }
}

export class IAMConfig {
  constructor(
    public issuer: string,
    public clientId: string
  ) {
  }
}
