import { Component, Inject, OnInit } from '@angular/core';
import { SocketService } from './services/SocketService';
import { ActionService, Action } from './services/ActionService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private wSocket: SocketService
              ,private aService: ActionService) {
  }
}
