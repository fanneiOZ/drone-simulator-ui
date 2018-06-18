import { Pipe, PipeTransform } from '@angular/core';
import { keyDirection } from './common/mapping';

@Pipe({
  name: 'DronePosition'
})
export class FormatPositionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let formattedMsg =
      'Currently drone is at ('
      + value.x.toString() + ','
      + value.y.toString() + ') heading '
      + keyDirection[value.direction % 4].toLowerCase() + '.'
    return formattedMsg;
  }

}
