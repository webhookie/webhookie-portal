import {Observable} from "rxjs";
import {TrafficData} from "../traffic-data";

export interface TrafficTable<T, R> {
  loadDetails(data: T): Observable<Array<R>>;
  readonly tableData: Observable<Array<TrafficData>>;

  loadData(): void;
}
