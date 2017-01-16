import * as path from "path";
import * as io from "../../lib/interfaces/io";

import {MangaCover} from "../../lib/interfaces/manga-cover.interface";
import {requestIO} from "./request-io";

/**
 * Root URL of a cover URL.
 */
const mcdCoverRoot: string = "http://mcd.iosphe.re/n/";

/**
 * Tail URL of the first volume's front cover.
 */
const mcdFontCoverTail: string = "/1/front/a/";

/**
 * Root URL of mcd API.
 */
const MCD_API_ROOT_URL: string = "http://mcd.iosphe.re/api/v1/";

/**
 * Returns a JSON object with the requested manga's title
 * and an URL to a known cover of its first volume,
 * wrapped in a Bluebird promise.
 * If no cover is found for the given manga,
 * returns a promise rejection.
 * @param name The manga's name.
 */
export async function getMangaCoverUrl(name: string): Promise<MangaCover> {
  const response: io.Response = await requestIO.post({
    uri: MCD_API_ROOT_URL + "search/",
    body: JSON.stringify({
      Title: name
    })
  });
  const data: any = JSON.parse(response.body);
  if (data.Results.length === 0) {
    throw new Error(`Manga ${name} not found`);
  }
  // body["Results"][0][0] : the requested manga's ID according to mcd.iosphe.re
  // http://mcd.iosphe.re/n/{ID}/1/front/a/ : the requested manga's volume 1 cover (in theory)
  // TODO: confirm that the cover url is always the same
  return {
    title: name,
    coverUrl: path.join(mcdCoverRoot, data.Results[0][0], mcdFontCoverTail)
  };
}
