import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, ActionService } from '../../services/ActionService';
import { ReversePipe } from 'ngx-pipes';

@Component({
  selector: 'msg-list',
  templateUrl: './drone-msg.html'
  , providers: [ReversePipe]
})
export class MessageListComponent implements OnInit {
  ActionStack: Array<Action>;

  ngOnInit() {
    this.aService.castedActionStack.subscribe(
      x => {
        this.ActionStack = this.reversePipe.transform(x);
      }
    );
  }

  constructor(private aService: ActionService, private reversePipe: ReversePipe) {

  }
}
