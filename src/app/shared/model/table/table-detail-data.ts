import {TableData} from "./table-data";

export abstract class TableDetailData implements TableData {
  abstract id: string;
  isLoading: boolean = true;

  loading() {
    this.isLoading = true;
  }
}
