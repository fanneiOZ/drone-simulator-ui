import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, ActionService } from '../../services/ActionService';
import { SocketService } from '../../services/SocketService';

@Component({
  selector: 'msg-list',
  templateUrl: './drone-msg.html'
})
export class MessageListComponent implements OnInit {
  ActionStack: Array<Action>;

  ngOnInit() {
    this.aService.castedActionStack.subscribe(
      x => {
        this.ActionStack = x;
      }
    );
  }

  constructor(private wSocket: SocketService, private aService: ActionService) {

  }
}
