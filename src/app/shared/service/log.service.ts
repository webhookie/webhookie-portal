import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  debug(message?: any, ...optionalParams: any[]): void {
    if(environment.debug && !environment.production) {
      console.debug(message, optionalParams);
    }
  }

  info(message?: any, ...optionalParams: any[]): void {
    console.info(message, optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]): void {
    console.warn(message, optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    console.error(message, optionalParams);
  }
}
