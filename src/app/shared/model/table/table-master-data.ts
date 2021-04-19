import {ReplaySubject, Subject} from "rxjs";
import {TableDetailData} from "./table-detail-data";
import {BaseTableData} from "./table-data";

export abstract class TableMasterData extends BaseTableData {
  abstract id: string;
  details: Subject<Array<TableDetailData>> = new ReplaySubject();
  isOpen: boolean = false;

  protected constructor() {
    super();
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  update(details: Array<TableDetailData>): void {
    this.toggle();
    this.details.next(details);
  }
}
