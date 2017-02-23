import 'rxjs/add/operator/switchMap';
import * as Promise       from 'bluebird';

import { Component }      from '@angular/core';
import { OnInit }         from '@angular/core';
import { ActivatedRoute}  from '@angular/router';
import { Params }         from '@angular/router';

import { SearchResults }  from '../../../../lib/interfaces/search-result.interface';
import { EmitterService } from '../../mmg-app/services/emitter.service';
import { ApiService }     from '../../search/services/api.service';
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'mmg-response-page',
  templateUrl: 'response-page.component.pug',
  styleUrls: ['response-page.component.scss']
})
export class ResponsePageComponent implements OnInit {

  /**
   * The query thanks to which content will be gathered.
   */
  protected query: string;

  /**
   * The list of results to display,
   * gathered thanks to the query.
   */
  // TODO: we probably need either query or results, but not both
  protected results: SearchResults;

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
        return Observable.create((observer: Observer<SearchResults>) => {
          this
            .search(params['query'])
            .then((res: SearchResults) => {
              observer.next(res);
            });
        });
      })
      .subscribe((results: SearchResults) => {
        console.log("Search completed!!!");
        console.log(results);
        this.emitterService.emit(EmitterService.events.SEARCH_COMPLETE, results, false);
        this.results = results;
      });
  }

  /**
   * Performs a search thanks to ManManga API.
   */
  protected search(query: string): Promise<SearchResults> {
    this.emitterService.emit(EmitterService.events.SEARCH_STARTED, query, false);
    return this.apiService.search(query);
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