import { Injectable, OnInit } from '@angular/core';
import { iconAction, ActionCode, keyDirection } from '../common/mapping';
import { SocketService, Request } from './SocketService';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogDisconnectComponent } from '../components/disconnect-dialog/disconnect-dialog';
import { DialogRemoteDisconnectComponent } from '../components/disconnect-remote-dialog/disconnect-dialog';

export class Action {
  constructor(   
    public commandInput: string,
    public actionID?: number,
    public currentPos?: { x: number, y: number, direction: number },
    public commandAction?: string,
    public cmdArg?: { x: number, y: number, direction: string },
    public objResponse?: any,
    public result?: number,
    public responseMessage?: string,
    public targetClient?: string,
    public sourceClient?: string,
    public actionIconName?: string,
    public commandHIndex?: number
  ) { }

}


@Injectable({
  providedIn: 'root'
})
export class ActionService  {

  public ClientID: string = 'xxxx';
  public ActionStack = new Array<Action>();
  private bhvActionStack = new BehaviorSubject<Array<Action>>(this.ActionStack);
  public castedActionStack = this.bhvActionStack.asObservable();
  public currentPosition: { x: number, y: number, direction: number };
  public cast = this.ActionStack

  private currActionID: number;
  private currCommandInput: string;

  private request: any;

  public connectedClients: any;
  public isRemoting: boolean = false;
  public isBeingRemoted: boolean = false;
  public requestClientID: string = '';
  public remotingClientID: string = '';

  constructor(private _wSocket: SocketService, private dialog: MatDialog) {

    this._wSocket.connectToWebSocket().subscribe(
      data => {
        if (this._wSocket.isClientIDRetrieved) {
          let parseData = JSON.parse(data);

               if (parseData.reqResult == -3) this.onRemoteClientedDisconnect();
          else if (parseData.reqResult == -4) this.pingpongRemoting(parseData.res.clientID);
          else if (parseData.reqResult == -5) this.pingpongRemoting();
          else if (parseData.reqResult > -2) {
            console.log(data);
            this.parseResponseToAction(parseData);
            this.broadcastActionStack();
          }
          else if (parseData.reqResult != -99) {
            this.parseConnectedClientsList(parseData);
            return;
          }
        } else {
          this.ClientID = data;
          console.log(this.ClientID);
          this._wSocket.isClientIDRetrieved = true;
        }

      },
      err => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(DialogDisconnectComponent, dialogConfig);
      },
      () => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(DialogDisconnectComponent, dialogConfig);
      }
    );
  }

  pingpongRemoting(requestingClientID?: string) {
    this.isBeingRemoted = requestingClientID ? true: false;
    this.requestClientID = requestingClientID? requestingClientID : '';
  }

  onRemoteClientedDisconnect() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DialogRemoteDisconnectComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        this.isRemoting = false;
        this.remotingClientID = '';
      }
    );
  }
  parseConnectedClientsList(data) {
    
    var connectedClients = new Array<{ clientID: string }>();

    data.res.connectedClient.forEach(client => {
      let item = { clientID: client };
      connectedClients.push(item);
    });

    this.connectedClients = connectedClients;
  }

  parseResponseToAction(data) {
    let newAction = new Action(data.commandInput);

    newAction.objResponse = data;
    newAction.responseMessage = data.res.message;
    newAction.commandAction = data.commandAction;

    newAction.result = data.reqResult;
    newAction.actionIconName = this.parseActionIcon(newAction);

    if (data.res.drone) {

      if (!data.res.drone.Owner) {
        newAction.commandHIndex = this.ActionStack.filter(x => x.commandHIndex).length + 1;
      }

      if (!data.res.drone.Owner && newAction.result == 1) {


        if (newAction.commandAction == ActionCode.Place) {
          let x = data.res.drone.Position[0];
          let y = data.res.drone.Position[1];
          let direction = keyDirection[data.res.drone.Direction % 4];
          let cmdArg = { x, y, direction };
          newAction.cmdArg = cmdArg;
        }
        
      } else if (data.res.drone.Owner && newAction.result == 1) {
        newAction.targetClient = data.res.clientID;
      }

      let x = data.res.drone.Position[0];
      let y = data.res.drone.Position[1];
      let direction = data.res.drone.Direction;
      this.currentPosition = { x, y, direction };


    }
    newAction.currentPos = this.currentPosition;
    this.addAction(newAction);
  }

  broadcastActionStack() {
    this.bhvActionStack.next(this.ActionStack);
  }

  actionFactory(action: Action, cmdArg?: any): void {
    var req: Request;
    var ClientID: string;
    this.currCommandInput = action.commandInput;

    if (this.isRemoting && this.remotingClientID != '' && this.remotingClientID != null)
      ClientID = this.remotingClientID

    req = this._wSocket.cmdRequestFactory(action.commandInput, cmdArg, ClientID);

    let actionMessage = this._wSocket.createRequestJSON(req);
    console.log(actionMessage);
    this._wSocket.sendMessage(actionMessage);
  }

  addAction(action: Action): number {
    try {
      action.actionID = this.ActionStack.length + 1;
      this.ActionStack.push(action);
      return action.actionID;
    } catch {
      return -1 ;
    }
  }
 
  getMessageIcon(IAction: string): string {
    var result: string;
   
    switch (IAction) {
      case ActionCode.Create: result = iconAction.Create; break;
      case ActionCode.Left: result = iconAction.Left; break;
      case ActionCode.Right: result = iconAction.Right; break;
      case ActionCode.Place: result = iconAction.Place; break;
      case ActionCode.Move: result = iconAction.Move; break;
      case ActionCode.Repeat: result = iconAction.Repeat; break;
      case ActionCode.Remote: result = iconAction.Remote; break;
      case ActionCode.StopRemote: result = iconAction.Exit; break;
      default: result = 'remove';
    }

    return result;

  }

  parseActionIcon(act: Action): string {
    var result: string;
         
    switch (act.result) {
      case 2: result = iconAction.Remote; break;
      case 0: result = iconAction.NoMove; break;
      case -1: result = iconAction.Create; break;
      default:
        switch (act.commandAction) {
          case ActionCode.Left: result = iconAction.Left; break;
          case ActionCode.Right: result = iconAction.Right; break;
          case ActionCode.Place: result = iconAction.Place; break;
          case ActionCode.Move: result = iconAction.Move; break;
          default: result = iconAction.Error; break;
        }
    }

    return result;
  }

}


