import {MangaCover} from "../../lib/interfaces/manga-cover.interface";
import {Manga} from "../../lib/interfaces/manga.interface";
import * as alchemy from "../lib/alchemy";
import * as DBPedia from "../lib/dbpedia";
import * as googlesearch from "../lib/googlesearch";
import * as McdIOSphere from "../lib/mcd-iosphere";
import * as spotlight from "../lib/spotlight";

/**
 * Returns a list of spotlight URLs related to the query.
 *
 * @param query
 * @returns {Promise<string[]>}
 */
export async function search (query: string): Promise<string[]> {
  console.log("QUERYING...");
  const searchResults: googlesearch.SearchResult[] = await googlesearch.search({query: query});
  console.log(searchResults);
  console.log("ALCHEMYING...");
  // TODO: handle empty array
  const alchemyResult: alchemy.Result = await alchemy.getTextFromURL(searchResults[0].link);
  console.log(alchemyResult);
  console.log("SPOTLIGHTING...");
  const spotlightResult: string[] = await spotlight.query(alchemyResult.text, alchemyResult.language);
  console.log(spotlightResult);
  return spotlightResult;
}

/**
 * A test pipeline using specific search.
 */
export async function search2 (query: string): Promise<DBPedia.SearchResult[]> {
  // TODO: use function to build query
  const googlesearchQuery: string = `${query} manga OR anime site:en.wikipedia.org`;
  const searchResults: googlesearch.SearchResult[] = await googlesearch.search({query: googlesearchQuery});
  console.log("Google results");
  console.log(searchResults);
  return Promise.all(searchResults
    .slice(0, 3)
    .map(async (searchResult: googlesearch.SearchResult): Promise<DBPedia.SearchResult> => {
      const url: string = searchResult.link;
      console.log(`dbpedia search for ${url}`);
      const dbpediaResult: DBPedia.SearchResult = await DBPedia.search(DBPedia.wikipediaArticleUrlToResourceUrl(url));
      if (dbpediaResult && dbpediaResult.manga !== undefined) {
        const manga: Manga = dbpediaResult.manga;
        try {
          const cover: MangaCover = await McdIOSphere.getMangaCoverUrl(DBPedia.resourceUrlToName(manga.title));
          manga.coverUrl = cover.coverUrl;
        } catch (err) {
          // At this point, it's not a problem if we don't find any cover
          // Just return the result
          // TODO: try to get something with anilist ?
        }
      }
      console.log("DBPedia result, maybe with cover");
      console.log(dbpediaResult);
      return dbpediaResult;
    }));
}
