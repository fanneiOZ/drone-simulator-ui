import { Component, Input } from '@angular/core';
import { icoDroneAction } from '../../common/mapping';

@Component({
  selector: 'icon',
  template: `<mat-icon mat-list-icon>rotate_left</mat-icon>`
})
export class ActionIconComponent {
  @Input() droneAction: string;
}
