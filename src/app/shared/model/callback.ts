import {CallbackSecurity} from "./callback-security";
import {SelectableItem} from "../components/searchable-select/searchable-select.component";
import {TableDetailData} from "./table/table-detail-data";

export class Callback extends TableDetailData implements SelectableItem {
  constructor(
    public id: string,
    public name: string,
    public httpMethod: string,
    public url: string,
    public signable: boolean = false,
    public security: CallbackSecurity | null
  ) {
    super();
  }
}
