import { Pipe }           from '@angular/core';
import { PipeTransform }  from '@angular/core';

@Pipe({
  name: 'stringifyArray'
})
export class StringifyArrayPipe implements PipeTransform {

  /**
   * Transforms an array of in a string,
   * with each array element separated by the separator.
   * @param array The array to stringify.
   * @param separator The separator to use. Default to ', '.
   * @returns {string}
   */
  public transform(array: any[] | any, separator: string = ', '): string {
    if(Array.isArray(array)) {
      return array.join(separator);
    }
    return array;
  }
}