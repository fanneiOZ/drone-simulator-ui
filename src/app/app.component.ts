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

  checkRecentCommand(): boolean {
    
    if (this.aService.ActionStack.filter(x => x.commandHIndex).length > 1)
      return true
    else 
      return false;
  }
}
