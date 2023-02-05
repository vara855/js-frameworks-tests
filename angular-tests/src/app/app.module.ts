import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { NgFor } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ChatMessageComponent],
  imports: [BrowserModule, NgFor],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  constructor(public readonly httpService: HttpService) {}
  ngOnInit(): void {
    this.httpService.checkBackend();
  }
}
