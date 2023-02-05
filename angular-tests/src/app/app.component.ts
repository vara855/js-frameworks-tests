import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ChatWsService } from './wss/chat-ws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-tests';
  array: any[] = [{ message: 'Test' }];
  constructor(
    public readonly httpService: HttpService,
    public readonly chatService: ChatWsService
  ) {}

  ngOnInit(): void {
    this.httpService.checkBackend();
  }
}
