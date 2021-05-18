import { Injectable } from '@angular/core';
import '@asyncapi/parser/dist/bundle';
import {AsyncAPIDocument, Schema} from "@asyncapi/parser/dist/bundle";
import {from, Observable} from "rxjs";
import { sample } from 'openapi-sampler';

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

  sample(schema: Schema, it: AsyncAPIDocument): any {
    let schema1 = {
      type: schema.type(),
      properties: {
        a: {type: 'integer', minimum: 10},
        b: {type: 'string', format: 'password', minLength: 10},
        c: {type: 'boolean', readOnly: true}
      }
    };
    return sample(schema, {skipReadOnly: true});
    // return sample(schema, undefined, it);
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
