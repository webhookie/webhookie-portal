import { Injectable } from '@angular/core';
import '@asyncapi/parser/dist/bundle';
import {AsyncAPIDocument} from "@asyncapi/parser/dist/bundle";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsyncapiParserService {
  // @ts-ignore
  private parser: AsyncAPIParser = window.AsyncAPIParser

  constructor() { }

  parse(spec: string): Observable<AsyncAPIDocument> {
    return from(this.parser.parse(spec));
  }
}

export interface AsyncAPIParser {
  parse(asyncapiYAMLorJSON: string, options?: {
    path?: string;
    parse?: any;
    resolve?: any;
    applyTraits?: any;
  }): Promise<AsyncAPIDocument>;
}
