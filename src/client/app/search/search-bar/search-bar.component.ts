import {Component, OnInit} from "@angular/core";
import {SearchResults} from "../../../../lib/interfaces/search-result.interface";
import {SearchResult} from "../../../../lib/interfaces/search-result.interface";
import {ApiService} from "../services/api.service";
import { Anime } from "../../../../lib/interfaces/anime.interface";
import { Author } from "../../../../lib/interfaces/author.interface";
import { Manga } from "../../../../lib/interfaces/manga.interface";
import { Character } from "../../../../lib/interfaces/character.interface";
import {AnimeComponent} from "../../response/anime-response/anime-response.component";
import {AuthorComponent} from "../../response/author-response/author-response.component";
import {MangaComponent} from "../../response/manga-response/manga-response.component";

@Component({
  selector: "mmg-search",
  moduleId: "search/search-bar/search-bar.component",
  templateUrl: "search-bar.component.pug",
  styleUrls: ["search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  private apiService: ApiService;
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
    // Nothing to do for the moment
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
   * An experimental search.
   */
  protected search(query: string): void {
    this.apiService
      .search(query)
      .then((results: SearchResults) => {
        // console.log("RESULTS RECEIVED:");
        // console.log(results);
        this.results=results;
      });
  }

  protected onClick(input: string) {
    this.search(input);
    this.fillWithResponses();
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
  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }
}
