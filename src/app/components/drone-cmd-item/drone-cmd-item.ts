import { Component,Input, OnInit } from '@angular/core';
import { Action } from '../../services/ActionService';

@Component({
  selector: 'cmd-item',
  templateUrl: './drone-cmd-item.html'
})
export class CommandItemComponent implements OnInit {
  @Input() pAction: Action;

  objAction: Action;

  ngOnInit() {
    this.objAction = this.pAction;
  }


}
