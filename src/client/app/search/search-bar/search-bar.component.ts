import { Component }      from '@angular/core';
import { ViewChild }      from '@angular/core';
import { ElementRef }     from '@angular/core';
import { EmitterService } from '../../mmg-app/services/emitter.service';

@Component({
  selector: 'mmg-search-bar',
  templateUrl: 'search-bar.component.pug',
  styleUrls: ['search-bar.component.scss']
})
export class SearchBarComponent {
  /**
   * Whether or not the input field contains some characters.
   * @type {boolean}
   */
  protected filled: boolean = false;

  /**
   * A reference to the input field.,
   * gathered by angular.
   */
  @ViewChild('searchfield')
  protected fieldRef: ElementRef;

  /**
   * Emits the event SEARCH_WANTED when the search button is pressed.
   * Does nothing if the query string is empty or undefined.
   * @param query The query to perform the search.
   */
  protected onClick(query: string): void {
    if(query && query != '') {
      this.emitterService.emit(EmitterService.events.SEARCH_WANTED, query, false);
    }
  }

  /**
   * Emits the event SEARCH_WANTED when the enter key is released.
   * Does nothing if the query string is empty or undefined.
   * @param event The KeyBoardEvent emitted, to check which key has been pressed.
   * @param query The query to perform the search.
   */
  protected onKeyUp(event: KeyboardEvent, query: string): void {
    // 13: enter
    // 8 : del
    // 46: suppr
    if(event.keyCode == 13 && query && query != '') {
      this.emitterService.emit(EmitterService.events.SEARCH_WANTED, query, false);
    } else if(!this.filled && event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 13) {
      this.filled = true;
    } else if(this.filled && this.fieldRef.nativeElement.value == '') {
      this.filled = false;
    }
  }

  /**
   * Instantiates the component,
   * and initializes needed services.
   */
  constructor(private emitterService: EmitterService) {
    // Nothing else to do
  }
}