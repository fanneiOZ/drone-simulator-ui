import { Pipe, PipeTransform } from '@angular/core';
import { ActionCode } from './common/mapping';

enum commandLabel {
  Move = 'Move forward',
  Left = 'Rotate left (CCW)',
  Right = 'Rotate right (CW)',
  Place = 'Place at (%x%,%y%) toward %direction%'
}

@Pipe({
  name: 'RecentCommand'
})
export class RecentCommandPipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    var result: string;

    switch (value.commandAction) {
      case ActionCode.Move:
        result = commandLabel.Move;
        break;
      case ActionCode.Left:
        result = commandLabel.Left;
        break;
      case ActionCode.Right:
        result = commandLabel.Right;
        break;
      case ActionCode.Place:
        
        if (value.cmdArg) {
          result = commandLabel.Place.replace('%x%', value.cmdArg.x.toString())
            .replace('%y%', value.cmdArg.y.toString())
            .replace('%direction%', value.cmdArg.direction.toLowerCase());
        }
        else { result = value.commandAction; }
        break;        
    }
    return result;
  }

}
