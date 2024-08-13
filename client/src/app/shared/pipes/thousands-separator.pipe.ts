import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsSeparator'
})
export class ThousandsSeparatorPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == null) {
      return '';
    }

    const num = value.toString().replace(/[^0-9]/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

}