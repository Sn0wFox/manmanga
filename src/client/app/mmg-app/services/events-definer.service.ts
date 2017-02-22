import { Injectable } from '@angular/core';

@Injectable()
export class EventsDefinerService {

  /**
   * Event fired when the search-bar triggers navigation
   * to the response page.
   * @type {string}
   */
  static readonly SEARCH_WANTED: string = "search-about";

  /**
   * Event fired when a search operation is about to start.
   * @type {string}
   */
  static readonly SEARCH_STARTED: string = "search-go";

  /**
   * Event fired when a search operation has been completed.
   * @type {string}
   */
  static readonly SEARCH_COMPLETE: string = "search-done";

  /**
   * Event fired for the tests.
   * @type {string}
   */
  static readonly TEST: string = "test";
}