import { Injectable } from '@angular/core';
import { Task } from '../Model/model';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string | any {
    return localStorage.getItem(key);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
