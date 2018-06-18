import { Component, Input, OnInit } from '@angular/core';
import { icoDroneAction, iconMessage, iconAction } from '../../common/mapping';
import { Action } from '../../services/ActionService';
import { FormatPositionPipe } from '../../format-position.pipe';

@Component({
  selector: 'msg-item',
  templateUrl: './drone-msg-item.html'
})
export class MessageItemComponent implements OnInit {
  @Input() pAction: Action;


  objAction: Action;

  iconName: string;
  msgCommand: string;
  wsMsg: string;
  

  ngOnInit() {
    this.objAction = this.pAction;
    this.msgCommand = (this.objAction.result == 0 ? 'UNABLE TO ' : '') + this.objAction.commandInput;
    this.wsMsg = this.objAction.responseMessage;
  }
}
