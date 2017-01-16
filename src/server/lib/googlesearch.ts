import cheerio = require("cheerio");
import {trim} from "lodash";
import * as querystring from "querystring";
import * as url from "url";
import * as io from "../../lib/interfaces/io";
import requestIO from "./request-io";

/**
 * A search result
 */
export interface SearchResult {
  /**
   * Title of the result
   */
  title?: string;

  /**
   * Short description of the result
   */
  snippet?: string;

  /**
   * Complete url to the page described by this result
   */
  link: string;
}

export interface Options {
  /**
   * Query to send  (`q` query string parameter)
   */
  query: string;

  /**
   * Google host to use.
   * Examples: "www.google.com", "www.google.fr"
   *
   * Default: "www.google.com"
   */
  host?: string;

  /**
   * Language code to use for the query (`hl` query string parameter)
   * Examples: "en", "fr"
   *
   * Default: "en"
   */
  language?: string;

  /**
   * Maximum number of results to get (`num` query string parameter)
   *
   * Default: 10
   */
  results?: number;
}

export interface CompleteOptions extends Options {
  host: string;
  language: string;
  results: number;
}

export const defaultOptions: CompleteOptions = {
  query: "",
  host: "www.google.com",
  language: "en",
  results: 10
};

/**
 * Merge two Option objects into a new Option object.
 * The values of `source` override the ones of `target`.
 *
 * @param target
 * @param source
 */
export function mergeOptions(target: CompleteOptions, source: Options): CompleteOptions;
export function mergeOptions(target: Options, source: CompleteOptions): CompleteOptions;
export function mergeOptions(target: Options, source: Options): Options;
export function mergeOptions(target: any, source: any): any {
  return Object.assign({}, target, source);
}

/**
 * Completes the provided object with default values
 *
 * @param options
 * @returns {CompleteOptions}
 */
export function resolveOptions(options: Options): CompleteOptions {
  return mergeOptions(defaultOptions, options);
}

/**
 * Return Google's results for the provided query
 *
 * @param options
 * @returns {Promise<SearchResult[]>}
 */
export async function search(options: Options): Promise<SearchResult[]> {
  const response: io.Response = await httpRequest(options);
  if (response.statusCode !== 200) {
    throw new Error("Unexpected status code");
  }
  return scrap(response.body);
}

/**
 * Perform an HTTP request to Google for the provided query and return Google's response.
 *
 * @param options
 * @returns {Promise<Response>}
 */
export async function httpRequest(options: Options): Promise<io.Response> {
  const completeOptions: CompleteOptions = resolveOptions(options);
  const getOptions: io.GetOptions = {
    uri: getSearchUri(completeOptions.host),
    queryString: {
      q: completeOptions.query,
      hl: completeOptions.language,
      num: completeOptions.results.toString(10)
    }
  };

  return requestIO.get(getOptions);
}

/**
 * Extract the results from the HTML page returned by Google.
 *
 * @param html
 * @returns {SearchResult[]}
 */
// TODO: scrap title and snippet
export function scrap(html: string): SearchResult[] {
  const results: SearchResult[] = [];
  const $: cheerio.Static = cheerio.load(html);
  // ires: I... Results, g: ?
  const resultNodes: cheerio.Cheerio = $("#ires").find("> ol > .g");
  resultNodes.each((i: number, e: cheerio.Element): void => {
    const elem: cheerio.Cheerio = $(e);
    // r: result
    const titleLinkNode: cheerio.Cheerio = elem.find("h3.r a");
    // st: snippet text
    const snippetNode: cheerio.Cheerio = elem.find(".st");

    if (titleLinkNode.length === 0) {
      return;
    }

    const link: string | null = getTargetLinkFromResultHref(titleLinkNode.attr("href"));
    const title: string = normalizeWhiteSpaces(titleLinkNode.text());
    const snippet: string = normalizeWhiteSpaces(snippetNode.text());

    if (link !== null) {
      results.push({
        title,
        snippet,
        link
      });
    }
  });
  return results;
}

/**
 * This functions returns the target link ("http://example.com") from the href value of a relust.
 * The href attribute of a value has the form "/url?q=http://example.com&...".
 *
 * The value can also be "/search?q=..." when redirecting to other searches (for example images), this value
 * is ignored (returns null).
 *
 * Returns `null` if the function is unable to extract the target link.
 *
 * @param href
 */
export function getTargetLinkFromResultHref(href: string): string | null {
  const parsedUrl: url.Url = url.parse(href);
  if (parsedUrl.pathname !== "/url" || typeof parsedUrl.query !== "string") {
    return null;
  }
  const queryStringData: {[key: string]: any} = querystring.parse(parsedUrl.query);

  if (typeof queryStringData["q"] !== "string") {
    return null;
  }

  return queryStringData["q"];
}

/**
 * Trims the string and replaces all sequences of consecutive white spaces characters to a single space character.
 *
 * A white space is defined by the `\s` regular expression character class.
 *
 * See: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
 */
export function normalizeWhiteSpaces(str: string): string {
  return trim(str).replace(/\s+/g, " ");
}

/**
 * Return the uri of the Google search page, according to the provided host
 * @param host
 * @returns {string}
 */
function getSearchUri(host: string): string {
  const protocol: string = "http";
  const pathname: string = "/search";
  return url.format({protocol, host, pathname});
}
