import 'rxjs/add/operator/toPromise';

import * as Bluebird  from 'bluebird';
import * as url       from 'url';

import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Anime }          from '../../../../lib/interfaces/anime.interface';
import { Author }         from '../../../../lib/interfaces/author.interface';
import { Character }      from '../../../../lib/interfaces/character.interface';
import { Manga }          from '../../../../lib/interfaces/manga.interface';
import { SearchResults }  from '../../../../lib/interfaces/search-result.interface';

// TODO: use url abstraction + encode it + put it as env variable or something to distinguish dev and prod
const serverUrl: string   = 'http://localhost:3000';
const apiBaseUrl: string  = serverUrl + '/api';

@Injectable()
export class ApiService {
  private http: Http;

  /**
   * Instantiates the service and inject sub-services.
   */
  public constructor(http: Http) {
    this.http = http;
  }

  /**
   * GET /api/pipeline2/:query
   * Search anything related to the keywords and manga/anime,
   * and returns them in an array wrapped in a promise.
   * Returns a promise rejection if there was a problem
   * with the request.
   * The result can be an array full of empty objects.
   * @param query Keywords of the query.
   */
  public search(query: string): Bluebird<SearchResults> {
    return Bluebird
      .try(() => {
        return this.http
          .get(url.format(url.parse(`api/pipeline3/${query}`)))
          .toPromise();
      })
      .then((response: any) => {
        return response.json();
      });
  }

  /**
   * GET /api/sparql/manga/:name
   * Returns the wanted manga,
   * or a Promise rejection if there was a problem with the request
   * (or if no manga could be found).
   * @param name The manga's name.
   */
  public getManga(name: string): Bluebird<Manga> {
    return Bluebird
      .try(() => {
        return this.http
          .get(url.format(url.parse(`api/manga/${name}`)))
          .toPromise();
      })
      .then((response: any) => {
        return response.json();
      });
  }

  /**
   * GET /api/sparql/anime/:name
   * Returns the wanted anime,
   * or a Promise rejection if there was a problem with the request
   * (or if no anime could be found).
   * @param name The anime's name.
   */
  public getAnime(name: string): Bluebird<Anime> {
    return Bluebird
      .try(() => {
        return this.http
          .get(url.format(url.parse(`api/anime/${name}`)))
          .toPromise();
      })
      .then((response: any) => {
        return response.json();
      });
  }

  /**
   * GET /api/sparql/author/:name
   * Returns the wanted author,
   * or a Promise rejection if there was a problem with the request
   * (or if no author could be found).
   * @param name The author's name.
   */
  public getAuthor(name: string): Bluebird<Author> {
    return Bluebird
      .try(() => {
        return this.http
          .get(url.format(url.parse(`api/author/${name}`)))
          .toPromise();
      })
      .then((response: any) => {
        return response.json();
      });
  }

  /**
   * GET /api/sparql/character/:name
   * Returns the wanted character,
   * or a Promise rejection if there was a problem with the request
   * (or if no character could be found).
   * @param name The character's name.
   */
  public getCharacter(name: string): Bluebird<Character> {
    return Bluebird
      .try(() => {
        return this.http
          .get(url.format(url.parse(`api/character/${name}`)))
          .toPromise();
      })
      .then((response: any) => {
        return response.json();
      });
  }
}
