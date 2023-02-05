import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  isBeOk: boolean;
  constructor() {
    this.isBeOk = true;
  }

  async checkBackend(): Promise<void> {
    fetch('/be/')
      .then(() => {
        this.isBeOk = true;
      })
      .catch((e) => {
        this.isBeOk = false;
      });
  }
}
