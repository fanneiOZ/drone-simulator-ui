import { Component } from '@angular/core';
import { ActionService } from '../../services/ActionService';
import { iconAction } from '../../common/mapping';

@Component({
  selector: 'appToolBar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class ToolbarComponent {
  constructor(private aService: ActionService) {
  }
}
