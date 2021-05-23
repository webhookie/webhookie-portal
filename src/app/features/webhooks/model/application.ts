import {SelectableItem} from "../../../shared/components/searchable-select/searchable-select.component";

export class Application implements SelectableItem{
  constructor(
    public id: string,
    public name: string,
    public entity: string,
    public consumerIAMGroups: Array<string>,
    public description?: string
  ) {
  }
}
