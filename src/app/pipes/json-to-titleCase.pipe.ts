import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replaceUnderscorePipe' })
export class ReplaceUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/_/g, ' ') : value;
  }
}
