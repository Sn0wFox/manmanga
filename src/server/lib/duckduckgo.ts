import * as url from "url";
import * as io from "../../lib/interfaces/io";
import requestIO from "./request-io";

export interface DuckDuckGoOptions {
  noHtml: boolean;
}

export interface RelatedTopic {
  /**
   * FirstURL: first URL in Result
   */
  FirstURL: string;

  /**
   * Icon: icon associated with related topic(s)
   */
  Icon: {
    /**
     * URL: URL of icon
     */
    URL: string;

    /**
     * Height: height of icon (px)
     */
    Height: string;

    /**
     * Width: width of icon (px)
     */
    Width: string;
  };

  /**
   *   Text: text from first URL
   */
  Text: string;

  /**
   * Result: HTML link(s) to related topic(s)
   */
  Result: string;
}

export interface Result {
  /**
   * FirstURL: first URL in Result
   */
  FirstURL: string;

  /**
   * Icon: icon associated with FirstURL
   */
  Icon: {
    /**
     * URL: URL of icon
     */
    URL: string;

    /**
     * Height: height of icon (px)
     */
    Height: string;

    /**
     * Width: width of icon (px)
     */
    Width: string;
  };

  /**
   *   Text: text from first URL
   */
  Text: string;

  /**
   * Result: HTML link(s) to external site(s)
   */
  Result: string;
}

/**
 * See https://duckduckgo.com/api
 */
export interface QueryResult {
  /**
   * Abstract: topic summary (can contain HTML, e.g. italics)
   */
  Abstract: string;

  /**
   * AbstractText: topic summary (with no HTML)
   */
  AbstractSource: string;

  /**
   * AbstractSource: name of Abstract source
   */
  AbstractText: string;

  /**
   * AbstractURL: deep link to expanded topic page in AbstractSource
   */
  AbstractURL: string;

  /**
   * Answer: instant answer
   */
  Answer: string;

  /**
   * AnswerType: type of Answer, e.g. calc, color, digest, info, ip, iploc,
   * phone, pw, rand, regexp, unicode, upc, or zip (see the tour page for
   * examples).
   */
  AnswerType: string;

  /**
   * Definition: dictionary definition (may differ from Abstract)
   */
  Definition: string;

  /**
   * DefinitionSource: name of Definition source
   */
  DefinitionSource: string;

  /**
   * DefinitionURL: deep link to expanded definition page in DefinitionSource
   */
  DefinitionURL: string;

  /**
   * Heading: name of topic that goes with Abstract
   */
  Heading: string;

  /**
   * Image: link to image that goes with Abstract
   */
  Image: string;

  ImageHeight?: number;

  ImageIsLogo?: 0 | 1;

  ImageWidth?: number;

  Infobox?: {
    content: any[];
    meta: any[];
  };

  /**
   * Redirect: !bang redirect URL
   */
  Redirect: string;

  /**
   * RelatedTopics: array of internal links to related topics associated with
   * Abstract
   */
  RelatedTopics: RelatedTopic[];

  /**
   * Results: array of external links associated with Abstract
   */
  Results: Result[];

  /**
   * Type: response category, i.e. A (article), D (disambiguation), C
   * (category), N (name), E (exclusive), or nothing.
   */
  Type: "" | "A" | "D" | "C" | "N" | "E";
  meta: any;
}

const apiProtocol: string = "http";
const apiHost: string = "api.duckduckgo.com";
const apiUri: string = url.format({protocol: apiProtocol, host: apiHost});
const DEFAULT_OPTIONS: DuckDuckGoOptions = {
  noHtml: true
};

function normalizeOptions(options: DuckDuckGoOptions | null): DuckDuckGoOptions {
  const result: DuckDuckGoOptions = Object.assign({}, DEFAULT_OPTIONS);
  if (options !== null) {
    Object.assign(result, options);
  }
  return result;
}

export async function query(query: string, options: DuckDuckGoOptions | null): Promise<QueryResult> {
  options = normalizeOptions(options);

  const ioOptions: io.GetOptions = {
    uri: apiUri,
    queryString: {
      q: query,
      no_html: options.noHtml ? 1 : 0,
      pretty: 1,
      format: "json",
      skip_disambig: 1
    }
  };

  const response: io.Response = await requestIO.get(ioOptions);
  return JSON.parse(response.body) as QueryResult;
}

// TODO: move this code away
const runExample: boolean = false;

if (runExample) {
  query("Goku", null)
    .then(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.error(err);
      }
    );
}
