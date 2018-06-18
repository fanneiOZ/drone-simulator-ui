import { Component, Input, OnInit } from '@angular/core';
import { ActionService, Action } from '../../services/ActionService';
import { ActionCode, ActionTooltip } from '../../common/mapping';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogPlaceAtComponent } from '../place-dialog/place-dialog';
import { DialogRemoteComponent } from '../remote-dialog/remote-dialog';
import { SocketService } from '../../services/SocketService';


@Component({
  selector: 'action-btn',
  templateUrl: './action-button.html'
})
export class ActionButtonComponent implements OnInit {

  @Input() ActionCode: string;
  @Input() Color: string;
  @Input() pRepeatAt?: number;

  repeatAt: number;
  iconName: string;
  tooltip: string;

  ngOnInit() {
    this.iconName = this.aService.getMessageIcon(this.ActionCode);

    if (this.pRepeatAt) {
      this.repeatAt = this.pRepeatAt;
    }

    switch (this.ActionCode) {
      case ActionCode.Left: this.tooltip = ActionTooltip.Left; break;
      case ActionCode.Right:
        this.tooltip = ActionTooltip.Right;
        break;
      case ActionCode.Move:
        this.tooltip = ActionTooltip.Move;
        break;
      case ActionCode.Repeat:
        this.tooltip = ActionTooltip.Repeat;
        break;
      case ActionCode.Place:
        this.tooltip = ActionTooltip.Place;
        break;
      case ActionCode.StopRemote:
        this.tooltip = ActionTooltip.StopRemote;
        break;
    }

  }

  constructor(private aService: ActionService, private dialog: MatDialog, private wSocket: SocketService) {
    
  }

  onbtnClick(event: any): void {
    var req, cmdArg;
    switch (this.ActionCode) {
      case ActionCode.Left:
      case ActionCode.Right:
      case ActionCode.Move:
        break;
      case ActionCode.Place:
        this.openPlaceAtDialog();
        return;
      case ActionCode.Repeat:
        let repeatAt = this.repeatAt;
        cmdArg = { repeatAt };
        break;
      case ActionCode.Remote:
        this.openRemoteDialog();
        return;
      case ActionCode.StopRemote:
        this.stopRemote();
        return;
    }

    if (cmdArg) this.aService.actionFactory(new Action(this.ActionCode), cmdArg)
    else this.aService.actionFactory(new Action(this.ActionCode));
    
  }
  stopRemote() {
    if (this.aService.isRemoting) {
      let req = { Command: 'exitremote', ClientID: this.aService.remotingClientID };
      this.wSocket.sendMessage(JSON.stringify(req));

      this.aService.remotingClientID = '';
      this.aService.isRemoting = false;

    } else if (this.aService.isBeingRemoted) {

      let req = { Command: 'cancelremote', ClientID: this.aService.requestClientID };
      this.wSocket.sendMessage(JSON.stringify(req));
      this.aService.isBeingRemoted = false;
      this.aService.remotingClientID = '';
    }
  }
  openRemoteDialog(): any {
    let req = { Command: 'remote' };

    this.wSocket.sendMessage(JSON.stringify(req));

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DialogRemoteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          let req = { Command: 'enterremote', ClientID: result.remoteClientID };
          this.wSocket.sendMessage(JSON.stringify(req));

          this.aService.remotingClientID = result.remoteClientID;
          this.aService.isRemoting = true;
        }
      }
    );

    return null;
  }

  openPlaceAtDialog(): any {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;



    let dialogRef = this.dialog.open(DialogPlaceAtComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {       
       

        let x = result.x; let y = result.y;
        let direction = result.direction;
        let cmdArg = { x, y, direction };

        this.aService.actionFactory(new Action(this.ActionCode), cmdArg);
      }
    );
  }
}
