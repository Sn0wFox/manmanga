import 'rxjs/add/operator/switchMap';
import * as Promise       from 'bluebird';

import { Component }      from '@angular/core';
import { OnInit }         from '@angular/core';
import { ActivatedRoute}  from '@angular/router';
import { Params }         from '@angular/router';
import { Observable }     from 'rxjs';
import { Observer }       from 'rxjs';

import { SearchResults }  from '../../../../lib/interfaces/search-result.interface';
import { EmitterService } from '../../mmg-app/services/emitter.service';
import { ApiService }     from '../../search/services/api.service';

@Component({
  selector: 'mmg-response-page',
  templateUrl: 'response-page.component.pug',
  styleUrls: ['response-page.component.scss']
})
export class ResponsePageComponent implements OnInit {

  /**
   * The list of results to display,
   * gathered thanks to the query.
   */
  protected results: SearchResults;

  /**
   * Whether or not the component is currently performing a search.
   * @type {boolean}
   */
  protected searching: boolean = false;

  /**
   * Properly initialize the component.
   * Gather the query parameter and subscribe to it
   * to update content upon another query.
   * Each time the query is updated, the event SEARCH_STARTED will be emitted
   * and a new search performed.
   * Once the search is performed, it will emit the SEARCH_COMPLETED event.
   */
  public ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        // Looks like bluebird is not accepted as input by fromPromise(),
        // so we build the observable by hand
        return Observable.create((observer: Observer<SearchResults>) => {
          this
            .search(params['query'])
            .then((res: SearchResults) => {
              observer.next(res);
            })
            .catch((err: Error) => {
              console.log("OOPS! The search hanged up");
              console.log(err);
              observer.next(null);
            });
        });
      })
      .subscribe((results: SearchResults) => {
        console.log("Search completed!!!");
        console.log(results);
        this.searching = false;
        this.results = results;
        if(results) {
          this.emitterService.emit(EmitterService.events.SEARCH_COMPLETE, results, false);
        } else {
          // There was an error. We should do something about it
          // TODO: display failed-component
          this.emitterService.emit(EmitterService.events.SEARCH_FAILED)
        }
      });
  }

  /**
   * Performs a search thanks to ManManga API.
   */
  protected search(query: string): Promise<SearchResults> {
    this.emitterService.emit(EmitterService.events.SEARCH_STARTED, query, false);
    this.searching = true;
    return this.apiService.search(query)
      .catch((err: Error) => {
        this.emitterService.emit(EmitterService.events.SEARCH_FAILED, query, false);
        return Promise.reject(err);
      });
  }

  /**
   * Instantiate the component and needed services.
   */
  public constructor(
    private emitterService: EmitterService,
    private route: ActivatedRoute,
    private apiService: ApiService) {
    // Nothing to do for the moment
  }
}