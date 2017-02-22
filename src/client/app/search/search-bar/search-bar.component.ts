import { Component, OnInit }      from '@angular/core';
import { ViewChild, ElementRef }  from '@angular/core';

import { SearchResults }  from '../../../../lib/interfaces/search-result.interface';
import { SearchResult }   from '../../../../lib/interfaces/search-result.interface';
import { Anime }          from '../../../../lib/interfaces/anime.interface';
import { Author }         from '../../../../lib/interfaces/author.interface';
import { Manga }          from '../../../../lib/interfaces/manga.interface';
import { Character }      from '../../../../lib/interfaces/character.interface';
import { ApiService }     from '../services/api.service';
import { EmitterService } from '../../mmg-app/services/emitter.service';
import Bluebird = require("bluebird");

@Component({
  selector: 'mmg-search-bar',
  templateUrl: 'search-bar.component.pug',
  styleUrls: ['search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  private mangaList: Manga[];
  private authorList: Author[];
  private animeList: Anime[];
  private characterList: Character[];
  private results: SearchResult[];
  private mangaFilter: boolean;
  private animeFilter: boolean;
  private authorFilter: boolean;
  private characterFilter: boolean;

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
   * Properly initialize component.
   */
  ngOnInit(): void {
    this.mangaList = [];
    this.authorList = [];
    this.animeList = [];
    this.characterList = [];
    this.results = [];
    this.mangaFilter = true;
    this.animeFilter = true;
    this.authorFilter = true;
    this.characterFilter = true;
  }

  /**
   * Performs a search thanks to ManManga API.
   */
  protected search(query: string): Bluebird<void> {
    return this.apiService
      .search(query)
      .then((results: SearchResults) => {
        // console.log('RESULTS RECEIVED:');
        // console.log(results);
        this.results=results;
      });
  }

  /**
   * Performs a search when the search button is pressed.
   * Does nothing if the query string is empty or undefined.
   * @param query The query to perform the search.
   */
  protected onClick(query: string) {
    if(query && query != '') {
      this
        .search(query)
        .then(() => {
          this.fillWithResponses();
          this.emitterService.emit(this.emitterService.events.SEARCH_COMPLETE, this.results, false);
        });
    }
  }

  /**
   * Performs a search when the enter key is pressed.
   * Does nothing if the query string is empty or undefined.
   * @param event The KeyBoardEvent emitted, to check which key has been pressed.
   * @param query The query to perform the search.
   */
  protected onKeyUp(event: KeyboardEvent, query: string): void {
    // 13: enter
    // 8 : del
    // 46: suppr
    if(event.keyCode == 13 && query && query != '') {
      this.search(query).then(() => {
        this.fillWithResponses();
        this.emitterService.emit(this.emitterService.events.SEARCH_COMPLETE, this.results, false);
      });
    } else if(!this.filled && event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 13) {
      this.filled = true;
    } else if(this.filled && this.fieldRef.nativeElement.value == '') {
      this.filled = false;
    }
  }

  chgManga(mgfltr: boolean): void {
    this.mangaFilter = mgfltr;
  }
  chgAnime(anmfltr: boolean): void {
    this.animeFilter = anmfltr;
  }
  chgAuthor(athfltr: boolean): void {
    this.authorFilter = athfltr;
  }
  chgCharacter(chfltr: boolean): void {
    this.authorFilter = chfltr;
  }

  protected fillWithResponses(): void {
    this.mangaList = [];
    this.authorList = [];
    this.animeList = [];
    this.characterList = [];
    for(let result of this.results) {
      if (result.author != undefined) {
          this.authorList.push(result.author);
      }
      else if (result.anime != undefined) {
          this.animeList.push(result.anime);
      }
      else if (result.manga != undefined) {
          this.mangaList.push(result.manga);
      }
      else if (result.character != undefined) {
          this.characterList.push(result.character);
      }
    }
  }

  /**
   * Instantiates the component,
   * and initializes needed services.
   */
  constructor(
    private apiService: ApiService,
    private emitterService: EmitterService) {
    // Nothing else to do
  }
}