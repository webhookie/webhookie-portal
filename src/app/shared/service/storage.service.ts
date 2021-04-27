import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  store(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  read(key: string): string | null {
    return localStorage.getItem(key)
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
