import Bluebird = require("bluebird");
import watson = require("watson-developer-cloud");

export type LanguageCode = "de" | "it" | "nl" | "ru" | "es" | "pt" | "hu" | "tr" | "fr" | "en";

export interface Result {
  url: string;
  language: LanguageCode;
  text: string;
}

const languageNameToLanguageCode: {[lang: string]: LanguageCode} = {
  french: "fr",
  english: "en",
  german: "de",
  dutch: "nl",
  italian: "it",
  russian: "ru",
  spanish: "es",
  portuguese: "pt",
  turkish: "tr",
  hungarian: "hu"
};

function getLanguageCode(languageName: string): LanguageCode {
  return languageName in languageNameToLanguageCode ? languageNameToLanguageCode[languageName] : "en";
}

export async function getTextFromURL(url: string): Promise<Result> {
  const alchemyLanguage: watson.AlchemyLanguage = watson.alchemy_language({
    // Nicolas'key available for up to 1000 requests a day
    api_key: "d1318ceb349318b5ab6b35ced1640cd8a76aa56e"
  });

  const parameters: watson.TextOptions = {
    url: url
  };

  const result: any = await Bluebird
    .fromCallback<watson.TextResult>((cb) => {
      alchemyLanguage.text(parameters, cb);
    });

  if (result.status === "ERROR") {
    throw new Error("`ERROR` status");
  }

  return {
    url: result.url,
    text: result.text,
    language: getLanguageCode(result.language)
  };
}
