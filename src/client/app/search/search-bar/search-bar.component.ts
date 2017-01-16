import {Component, OnInit} from "@angular/core";
import {SearchResults} from "../../../../lib/interfaces/search-result.interface";
import {ApiService} from "../services/api.service";

// TODO: does this component really perform any request ?
@Component({
  selector: "mmg-search",
  moduleId: "search/search-bar/search-bar.component",
  templateUrl: "search-bar.component.pug",
  styleUrls: ["search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  private apiService: ApiService;

  /**
   * Properly initialize component.
   */
  ngOnInit(): void {
    // Nothing to do for the moment
  }

  /**
   * An experimental search.
   */
  protected search(query: string): void {
    this.apiService
      .search(query)
      .then((results: SearchResults) => {
        console.log("RESULTS RECEIVED:");
        console.log(results);
      });
  }

  /**
   * Instantiates the component,
   * and initializes needed services.
   */
  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }
}
