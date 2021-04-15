import {ReplaySubject, Subject} from "rxjs";
import {TableDetailData} from "./table-detail-data";
import {TableData} from "./table-data";

export abstract class TableMasterData implements TableData {
  abstract id: string;
  details: Subject<Array<TableDetailData>> = new ReplaySubject();
  isOpen: boolean = false;
  isLoading: boolean = false;

  protected constructor() {
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  update(details: Array<TableDetailData>): void {
    this.toggle();
    this.details.next(details);
  }

  loading() {
    this.isLoading = true;
  }

  loaded() {
    this.isLoading = false;
  }
}
