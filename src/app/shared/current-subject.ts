import { ReplaySubject } from "rxjs";

// noinspection JSUnusedGlobalSymbols
export class CurrentSubject<T> extends ReplaySubject<T> {
  value?: T;

  set(value?: T) {
    this.value = value;
    this.next(value);
  }

  static create<T>(bufferSize?: number): CurrentSubject<T> {
    return new CurrentSubject(bufferSize);
  }
}
