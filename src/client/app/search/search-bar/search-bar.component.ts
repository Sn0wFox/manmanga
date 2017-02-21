import { Component, OnInit }  from '@angular/core';

import { SearchResults }  from '../../../../lib/interfaces/search-result.interface';
import { SearchResult }   from '../../../../lib/interfaces/search-result.interface';
import { Anime }          from '../../../../lib/interfaces/anime.interface';
import { Author }         from '../../../../lib/interfaces/author.interface';
import { Manga }          from '../../../../lib/interfaces/manga.interface';
import { Character }      from '../../../../lib/interfaces/character.interface';
import { ApiService }     from '../services/api.service';

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
  protected search(query: string): void {
    this.apiService
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
      this.search(query);
      this.fillWithResponses();
    }
  }

  /**
   * Performs a search when the enter key is pressed.
   * Does nothing if the query string is empty or undefined.
   * @param event The KeyBoardEvent emitted, to check which key has been pressed.
   * @param query The query to perform the search.
   */
  protected onKeyPress(event: KeyboardEvent, query: string) {
    if(event.keyCode == 13 && query && query != '') {
      this.search(query);
      this.fillWithResponses();
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
    for(var result of this.results) {
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
  constructor(private apiService: ApiService) {
    // Nothing else to do
  }
}
