import { Component, Inject, OnInit } from '@angular/core';
import { ActionService } from './services/ActionService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public aService: ActionService) {
  }
}
