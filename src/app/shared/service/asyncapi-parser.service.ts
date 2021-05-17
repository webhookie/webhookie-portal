import { Injectable } from '@angular/core';
import '@asyncapi/parser/dist/bundle';

@Injectable({
  providedIn: 'root'
})
export class AsyncapiParserService {
  // @ts-ignore
  private parser = window.AsyncAPIParser

  constructor() { }

  parse(spec: string): Promise<any> {
    return this.parser
      .parse(spec);
  }
}
