import { Pipe }           from '@angular/core';
import { PipeTransform }  from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  /**
   * Truncates the text at n characters and happens "..." to it.
   * If n is n <= 0, it is then set to 100.
   * If the text's length is lesser than n, only happens "...".
   * @param text The text to truncate.
   * @param n The number of character to keep. Default to 100.
   * @returns {string}
   */
  public transform(text: string, n: number = 100): string {
    if(n <= 0) {
      n = 100;
    }
    if(n >= text.length) {
      return text + "...";
    }
    return text.substr(0, n) + "...";
  }
}