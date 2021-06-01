import {CallbackSecurity} from "./callback-security";
import {SelectableItem} from "../components/searchable-select/searchable-select.component";

export class Callback implements SelectableItem{
  constructor(
    public id: string,
    public name: string,
    public httpMethod: string,
    public url: string,
    public signable: boolean = false,
    public security: CallbackSecurity | null
  ) {
  }
}
