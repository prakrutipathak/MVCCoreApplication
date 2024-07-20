import { Pipe, PipeTransform } from '@angular/core';
import { first } from 'rxjs';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string| undefined | null,): string| undefined | null {
    if(!value) return value;
    return value.replace(/\b\w/g,first=>first.toLocaleUpperCase());
  }

}
