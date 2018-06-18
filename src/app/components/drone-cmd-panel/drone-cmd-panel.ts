import { Component } from '@angular/core';
import { ActionService } from '../../services/ActionService';

@Component({
  selector: 'cmd-panel',
  templateUrl: './drone-cmd-panel.html'
})
export class CommandPanelComponent {
  constructor(private aService: ActionService) {
  }
}
