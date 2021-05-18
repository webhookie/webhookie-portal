import {Observable} from "rxjs";

export interface Adapter<T> {
  adapt(item: any): T;
  adaptList(item: Array<any>): Array<T>;
}

export abstract class BaseAdapter<T> implements Adapter<T>{
  abstract adapt(item: any): T;

  adaptList(items: Array<any>): Array<T> {
    return items.map(it => this.adapt(it));
  }
}

export interface RxAdapter<T> {
  adapt(item: any): Observable<T>;
  adaptList(items: Array<any>): Observable<Array<T>>;
}

