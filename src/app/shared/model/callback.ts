import {CallbackSecurity} from "./callback-security";
import {SelectableItem} from "../components/searchable-select/searchable-select.component";

export class Callback implements SelectableItem{
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
