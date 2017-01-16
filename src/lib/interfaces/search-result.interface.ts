import {Anime} from "./anime.interface";
import {Author} from "./author.interface";
import {Character} from "./character.interface";
import {Manga} from "./manga.interface";

export interface SearchResult {
  /**
   * A possible manga matching the search criteria.
   */
  manga?: Manga;

  /**
   * A possible anime matching the search criteria.
   */
  anime?: Anime;

  /**
   * A possible author matching the search criteria.
   */
  author?: Author;

  /**
   * A possible character matching the search criteria.
   */
  character?: Character;
}

export type SearchResults = SearchResult[];
