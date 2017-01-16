import * as cheerio from "cheerio";
import {posix as path} from "path";
import * as url from "url";
import * as io from "../../lib/interfaces/io";
import requestIO from "./request-io";

const API_PROTOCOL: string = "http";
const API_HOST: string = "dbpedia-spotlight.com";

/**
 * @param text
 * @param language
 * @returns {string []}
 */
export async function query(text: string, language: string): Promise<string[]> {
  const apiPath: string = path.join("/", language, "annotate");
  const apiUri: string = url.format({protocol: API_PROTOCOL, host: API_HOST, pathname: apiPath});

  const ioOptions: io.PostOptions = {
    uri: apiUri,
    form: {
      text: text.substr(0, 500), // Text to analyze
      confidence: "0.8", // Confidence of the return URI (btw 0 and 1)
      support: "0", // Min number of incoming links require
      spotter: "Default", // ???
      disambiguator: "Default", // ???
      policy: "whiteliste", // ???
      types: "", // DBpedia type.
      sparql: "" // Potential sparql request to eliminate some returns URI
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    }
  };

  const response: io.Response = await requestIO.post(ioOptions);

  return scrapJsonResult(JSON.parse(response.body)["Resources"]);
}

function scrapHtmlResult(html: string): string[] {
  const links: string[] = [];

  const $: cheerio.Static = cheerio.load(html);

  $("a").each((index: number, element: cheerio.Element) => {
    const href: string = $(element).attr("href");
    links.push(href);
  });

  return links;
}

function scrapJsonResult(result: any[]): string[] {
  const res: any[] = [];
  for (const object of result) {
    res.push(object["@URI"]);
  }
  return res;
}
