import { Pipe, PipeTransform } from '@angular/core';
import { ActionCode, keyDirection } from './common/mapping';

enum messageLabel {
  Move = 'Moved forward',
  Left = 'Rotated left from %direction-1% to %direction%',
  Right = 'Rotated right from %direction+1% to %direction%',
  Place = 'Placed at (%x%,%y%) %direction%',
  Create = 'Created & placed at (3,3) north',
  Undefined = 'Send command to drone'
}

@Pipe({
  name: 'formatMessage'
})
export class FormatMessagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var prefix: string = '';
    var command: string;

    if (value.result == -1) {
      command = messageLabel.Create;
    }
    if (value.result == 0) {
      prefix = 'Unable to'
    } else if (value.result == 2) {
      prefix = 'Remotely'
    } else if (value.commandInput == ActionCode.Repeat) {
      prefix = 'Repeated -'
    }

    if (value.result != -1) {
      switch (value.commandAction) {
        case ActionCode.Move:
          command = messageLabel.Move;
          break;
        case ActionCode.Left:
          command = messageLabel.Left
            .replace('%direction%', keyDirection[value.currentPos.direction % 4].toLowerCase())
            .replace('%direction-1%', keyDirection[(value.currentPos.direction - 1) % 4].toLowerCase())
          break;
        case ActionCode.Right:
          command = messageLabel.Right
            .replace('%direction%', keyDirection[value.currentPos.direction % 4].toLowerCase())
            .replace('%direction+1%', keyDirection[(value.currentPos.direction + 1) % 4].toLowerCase())
          break;
        case ActionCode.Place:
          if (value.cmdArg) {
            command = messageLabel.Place
              .replace('%x%', value.cmdArg.x.toString())
              .replace('%y%', value.cmdArg.y.toString())
              .replace('%direction%', value.cmdArg.direction);
          } else { command = ActionCode.Place; }
          break;
        default:
          command = messageLabel.Undefined

      }
    }

    return prefix + ' ' + command ;
  }

}
