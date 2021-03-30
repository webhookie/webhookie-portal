export class Callback {
  constructor(
    public callbackId: string,
    public name: string,
    public httpMethod: string,
    public url: string,
    public security?: CallbackSecurityDTO
  ) {
  }
}

export class CallbackSecurityDTO {
  constructor(
    public keyId: string
  ) {
  }
}
