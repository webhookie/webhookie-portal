export class WebhookGroup {
  constructor(
    public id: string,
    public title: string,
    public version: string,
    public description: string,
    public spec: string,
    public topics: Array<Topic>
  ) {
  }
}

export class Topic {
  constructor(
    public name: string,
    public description: string
  ) {
  }
}
