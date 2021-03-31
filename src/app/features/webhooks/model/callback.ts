import {CallbackSecurity} from "../../../shared/model/callback-security";

export class Callback {
  constructor(
    public callbackId: string,
    public name: string,
    public httpMethod: string,
    public url: string,
    public security?: CallbackSecurity,
    public signable: boolean = false
  ) {
  }
}
