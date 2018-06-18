import { Injectable } from '@angular/core';
import { ActionCode } from '../common/mapping';
import { Observable } from 'rxjs';
import { ActionService } from './ActionService';

export class Request {
  constructor(
    public Command: string,
    public cmdArg?: any,
    public ClientID?: string,   
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  ws: WebSocket;
  isClientIDRetrieved: boolean;
  

  createRequestJSON(req: Request): string {
    let result = JSON.stringify(req);
    return result;
  }

  cmdRequestFactory(aCode: string, cmdArg?: any, ClientID?: any): Request {
    var result: Request;
    switch (aCode) {
      case ActionCode.Left:
      case ActionCode.Right:
      case ActionCode.Move:
        result = new Request(aCode);
        break;
      case ActionCode.Place:
      case ActionCode.Repeat:
        if (cmdArg) result = new Request(aCode, cmdArg);
        break;
    }
    if (ClientID) result.ClientID = ClientID;
    return result;
  }

  connectToWebSocket(): Observable<any> {
    this.ws = new WebSocket("ws://dronesimulatorws.azurewebsites.net");

    return new Observable(observer => {
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onclose = (event) => observer.complete();
    });
  }

  sendMessage(message: string): boolean {
    try {
      this.ws.send(message);
      return true;
    } catch {
      return false;
    }
  }
}
