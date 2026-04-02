import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(text: string | undefined): string {
    if (typeof text !== 'string' || !text) {
      return text ? text : '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
