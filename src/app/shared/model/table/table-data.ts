export interface TableData {
  id: string;
  isLoading: boolean;
  loading(): void;
  loaded(): void;
}

export abstract class BaseTableData implements TableData {
  abstract id: string;
  isLoading: boolean = true;

  loading() {
    this.isLoading = true;
  }

  loaded() {
    this.isLoading = false;
  }
}
