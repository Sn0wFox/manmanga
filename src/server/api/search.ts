import * as Bluebird  from 'bluebird';
import * as Indexden  from 'indexden-client';

import { MangaCover }     from '../../lib/interfaces/manga-cover.interface';
import { Manga }          from '../../lib/interfaces/manga.interface';
import { AnilistApi }     from '../lib/anilist-api.class';
import { Manga as AlMg }  from '../lib/anilist-api.interfaces';
import * as alchemy       from '../lib/alchemy';
import * as DBPedia       from '../lib/dbpedia';
import * as googlesearch  from '../lib/googlesearch';
import * as McdIOSphere   from '../lib/mcd-iosphere';
import * as spotlight     from '../lib/spotlight';


/**
 * Returns a list of spotlight URLs related to the query.
 * @param query
 * @returns {Promise<string[]>}
 */
export async function search (query: string): Promise<string[]> {
  // console.log('QUERYING...');
  const searchResults: googlesearch.SearchResult[] = await googlesearch.search({query: query});
  // console.log(searchResults);
  // console.log('ALCHEMYING...');
  // TODO: handle empty array
  const alchemyResult: alchemy.Result = await alchemy.getTextFromURL(searchResults[0].link);
  // console.log(alchemyResult);
  // console.log('SPOTLIGHTING...');
  const spotlightResult: string[] = await spotlight.query(alchemyResult.text, alchemyResult.language);
  // console.log(spotlightResult);
  return spotlightResult;
}

/**
 * A test pipeline using specific search.
 */
export async function search2 (query: string): Promise<DBPedia.SearchResult[]> {
  // TODO: use function to build query
  const googlesearchQuery: string = `${query} manga OR anime site:en.wikipedia.org`;
  const searchResults: googlesearch.SearchResult[] = await googlesearch.search({query: googlesearchQuery});
  // console.log('Google results');
  // console.log(searchResults);
  return Promise.all(searchResults
    .slice(0, 3)
    .map(async (searchResult: googlesearch.SearchResult): Promise<DBPedia.SearchResult> => {
      const url: string = searchResult.link;
      // console.log(`dbpedia search for ${url}`);
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
      // console.log('DBPedia result, maybe with cover');
      // console.log(dbpediaResult);
      return dbpediaResult;
    }));
}

/**
 * A test pipeline using our own indexing.
 */
export function search3(query: string): Bluebird<DBPedia.SearchResult[]> {
  let client = new Indexden.Client(process.env.INDEXDEN_ENDPOINT);
  let q: string = 'docid:' + query;
  let aniList: AnilistApi = new AnilistApi();
  return client
    .search('manmanga2', {
      q: q,
      fetch: '*',
      fetch_categories: true
    })
    .then((res: Indexden.Search.Result) => {
      return res.results;
    })
    .map((res: Indexden.Search.Match) => {
      let obj: any = {};
      if(!res.categories) {
        // The hell is that ?
        obj['unknown'] = res;
        return obj;
      }
      switch(res.categories['type']) {
        // TODO: update typings so we won't have to deal with this mess
        case 'manga':
          obj['manga'] = res;
          obj['manga'].title = res.docid;
          break;
        case 'anime':
          obj['anime'] = res;
          obj['anime'].title = res.docid;
          break;
        default:
          // The hell is that ?
          break;
      }
      return <DBPedia.SearchResult>obj;
      // TODO: update typings so we won't have to cast it like this
    })
    .map((dbpediaResult: DBPedia.SearchResult) => {
      if (dbpediaResult && dbpediaResult.manga !== undefined) {
        return aniList
          // TODO: clean title
          .searchManga(DBPedia.resourceUrlToName(dbpediaResult.manga.title))
          .then((manga: AlMg[]) => {
            if(manga && manga[0]) {
              dbpediaResult.manga.coverUrl = manga[0].image_url_lge;
              dbpediaResult.manga.genres = manga[0].genres;
            }
            return dbpediaResult;
          })
          .catch((err: Error) => {
            console.log(err);
            // Erf, something failed here, but that's not a problem: covers are optional
            // Just return the previous result
            return dbpediaResult;
          });
      }
      return dbpediaResult;
    });
}