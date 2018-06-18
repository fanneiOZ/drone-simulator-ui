import { Pipe, PipeTransform } from '@angular/core';
/*
 @Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe {
  transform (values) {
    if (values) {
      return values.reverse();
    }
  }
}
*/
@Pipe({
  name: 'reversex',
  pure: true
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      return value.reverse();
    }
  }

}
