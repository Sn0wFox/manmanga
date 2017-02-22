import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';
import { Input }      from '@angular/core';

import { SearchResults }  from '../../../../lib/interfaces/search-result.interface';
import { EmitterService } from '../../mmg-app/services/emitter.service';

@Component({
  selector: 'mmg-response-page',
  templateUrl: 'response-page.component.pug',
  styleUrls: ['response-page.component.scss']
})
export class ResponsePageComponent implements OnInit {

  /**
   * The list of results to display.
   * They can be passed as input for the component,
   * or gathered through event.
   */
  @Input()
  protected results: SearchResults;

  /**
   * Properly initialize the component.
   * Set a handler for the event SEARCH_COMPLETE.
   */
  public ngOnInit(): void {
    this.emitterService.on(this.emitterService.events.SEARCH_COMPLETE, (res: SearchResults) => {
      this.results = res;
    });
    // TODO: handle something like SEARCH_STARTED to display preloader ?
  }

  /**
   * Instantiate the component and needed services.
   */
  public constructor(private emitterService: EmitterService) {
    // Nothing to do for the moment
  }
}