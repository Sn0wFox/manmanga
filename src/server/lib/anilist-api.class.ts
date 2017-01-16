import {Character} from "../../lib/interfaces/character.interface";
import * as io from "../../lib/interfaces/io";
import {
  Anime as AnilistAnime,
  Character as AnilistCharacter,
  Manga as AnilistManga,
  Staff as AnilistStaff,
  Studio as AnilistStudio
} from "./anilist-api.interfaces";
import requestIO from "./request-io";

/**
 * Private interface for manipulating authentication token.
 */
interface AuthToken {
  token: string;            // The actual token
  expirationDate: number;   // Timestamp in seconds
}

export class AnilistApi {
  /**
   * Anilist's API entry point.
   *
   * @type {string}
   */
  protected static readonly anilistEntryPoint: string = "https://anilist.co/api";

  /**
   * The app client's ID.
   * Must stay secret.
   *
   * @type {string}
   */
  private static readonly clientID: string = "sn0wfox-syfsx";

  /**
   * The app client's secret.
   * Must stay secret.
   * @type {string}
   */
  private static readonly clientSecret: string = "i9fiEWiHzOKxhp0FDy9I3pwY5RX2n";

  /**
   * The app authentication token.
   * Without this, no anilist's API calls can be performed.
   * Undefined until the first API call.
   */
  private authToken: AuthToken;

  /**
   * Gathers all known information about the given character,
   * or a promise rejection if there was an error with the request.
   * If no information can be found about the given character,
   * returns a promise rejection.
   * Meant to research a character with a precise name;
   * to search a character with a fragment name,
   * please take a look at searchCharacter().
   *
   * @param name The character's name.
   */
  public async getCharacter(name: string): Promise<Character> {
    await this.ensureAuth();
    const response: io.Response = await requestIO.get({
      // TODO: use path.posix.join
      uri: this.constructUrl("/character/search/", name),
      queryString: {
        access_token: this.authToken.token
      }
    });

    const result: {id: number}[] = JSON.parse(response.body);

    if (!result[0]) {
      throw new Error(`Unable to find character ${name}`);
    }

    return this.getCharacterById(result[0].id);
  }

  /**
   * Gathers all known information about the given character,
   * or a promise rejection if there was an error with the request.
   * If no information can be found about the given character,
   * returns a promise rejection.
   */
  protected async getCharacterById(id: number | string): Promise<Character> {
    await this.ensureAuth();

    const response: io.Response = await requestIO.get({
      // TODO: use path.posix.join
      uri: this.constructUrl("/character/" + id + "/page"),
      queryString: {
        access_token: this.authToken.token
      }
    });

    const character: any = JSON.parse(response.body);
    if (!character) {
      throw new Error(`Unable to find character with id ${id}`);
    }

    let from: string;
    if (character.manga.length !== 0) {
      from = character.manga[0].title_romaji;
    } else {
      from = character.anime[0].title_romaji;
    }

    return {
      name: `${character.name_first} ${character.name_last}`,
      pictureUrl: character.image_url_lge,
      from: from,
      abstract: character.info
    };
  }

  /**
   * Searches all mangas matching the given keywords.
   * @param keywords A string containing all keywords to search,
   * separated by spaces.
   */
  public async searchManga(keywords: string): Promise<AnilistManga> {
    return this.search("manga", keywords);
  }

  /**
   * Searches all animes matching the given keywords.
   * @param keywords A string containing all keywords to search,
   * separated by spaces.
   */
  public searchAnime(keywords: string): Promise<AnilistAnime> {
    return this.search("anime", keywords);
  }

  /**
   * Searches all characters matching the given keywords.
   * @param keywords A string containing all keywords to search,
   * separated by spaces.
   * @param max The maximum number of results wanted.
   */
  public async searchCharacter(keywords: string, max?: number): Promise<Character[]> {
    const results: AnilistCharacter[] = await this.search("character", keywords);
    if (!results || results.length === 0) {
      throw new Error(`No result (character) for: ${keywords}`);
    }
    if (max !== undefined) {
      results.length = Math.min(results.length, max);
    }

    return Promise.all(results.map((res: AnilistCharacter) => this.getCharacterById(res.id)));
  }

  /**
   * Searches all staff (actor, writer, ...) matching the given keywords.
   * @param keywords A string containing all keywords to search,
   * separated by spaces.
   */
  public searchStaff(keywords: string): Promise<AnilistStaff> {
    return this.search("staff", keywords);
  }

  /**
   * Searches all studios matching the given keywords.
   * @param keywords A string containing all keywords to search,
   * separated by spaces.
   */
  public searchStudio(keywords: string): Promise<AnilistStudio> {
    return this.search("studio", keywords);
  }

  /**
   * Searches the given keywords thanks to the anilist API.
   * Results' types will vary with the parameter toSearch.
   *
   * @param kind The object to search. Must be in ["anime", "character", "manga", "staff", "studio"].
   * @param keywords The keywords that must be searched.
   */
  protected async search(kind: "anime" | "character" | "manga" | "staff" | "studio", keywords: string): Promise<any> {
    const kindsWhitelist: string[] = ["anime", "character", "manga", "staff", "studio"];
    if (kindsWhitelist.indexOf(kind) === -1) {
      throw new Error(`Search kind must be one of ${kindsWhitelist}, got: ${kind}`);
    }
    await this.ensureAuth();

    const response: io.Response = await requestIO.get({
      uri: this.constructUrl(kind + "/search/", keywords)
    });

    return JSON.parse(response.body);
  }

  /**
   * Constructs the API URL to request.
   * BEWARE, requires that the auth token is still valid.
   * Therefore you need to call this.ensureAuth() before calling this method.
   *
   * @param endpoint Anilist endpoint to call. Example: anime/search.
   * @param params Eventual parameters to add after the endpoint.
   */
  // TODO: Fix this
  protected constructUrl(endpoint: string, params?: string): string {
    return encodeURI(AnilistApi.anilistEntryPoint
      + "/" + endpoint.replace(/^\//g, "").replace(/\/$/g, "")
      + (params ? "/" + params : "")
      + "?access_token=" + this.authToken.token);
  }

  /**
   * Ensure that the authentication token won't expire soon,
   * so requests can be safely made to the API.
   */
  protected async ensureAuth(): Promise<void> {
    // If the token has still more than one minute before expiration,
    // we don't need to regenerate one
    if (this.authToken && Date.now() < this.authToken.expirationDate - 60) {
      return;
    }

    // Otherwise, we should (re)generate one
    return this.getAuthToken();
  }

  /**
   * Updates the field authToken with a new token,
   * or returns a promise rejection if there was an error with the request.
   */
  protected async getAuthToken(): Promise<void> {
    try {
      const response: io.Response = await requestIO.post({
        uri: AnilistApi.anilistEntryPoint + "/auth/access_token",
        form: {
          grant_type: "client_credentials",
          client_id: AnilistApi.clientID,
          client_secret: AnilistApi.clientSecret
        }
      });

      const token: any = JSON.parse(response.body);
      this.authToken = {
        token: token["access_token"],
        expirationDate: token["expires"]
      };
    } catch (err) {
      throw new Error(`Cannot aquire Anilist auth token\n${err}`);
    }
  }
}
