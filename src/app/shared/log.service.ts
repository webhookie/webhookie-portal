import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  debug(message?: any, ...optionalParams: any[]): void {
    console.debug(message, optionalParams);
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
