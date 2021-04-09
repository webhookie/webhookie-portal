import {Observable} from "rxjs";

export interface TrafficTable<T, R> {
  loadDetails(data: T): Observable<Array<R>>;
}
