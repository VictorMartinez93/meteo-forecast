import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public get(key: string) {
    const storage = sessionStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage);
    }

    return undefined;
  }

  public set(key: string, data: unknown): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  public remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clear(): void {
    sessionStorage.clear();
  }

}
