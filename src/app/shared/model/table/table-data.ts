export interface TableData {
  id: string;
  isLoading: boolean;
  loading(): void;
  loaded(): void;
}
