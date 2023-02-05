import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CMessage } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ChatWsService implements OnInit, OnDestroy {
  private wsClient: WebSocket;
  public messages: CMessage[] = [];
  constructor() {
    this.wsClient = new WebSocket('ws://localhost:3030/be/ws');
    this.wsClient.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log('Received message from server: ', data);
      this.messages.push(data);
    };
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.wsClient.close();
  }
}
