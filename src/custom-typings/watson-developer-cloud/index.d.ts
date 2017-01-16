/* tslint:disable:no-namespace no-mergeable-namespace */

declare module "watson-developer-cloud" {
  namespace watson {
    export interface AlchemyLanguageOptions {
      api_key: string;
    }

    export interface TextOptions {
      url: string;
    }

    export interface TextResult {
      status: "OK" | "ERROR";
      language: string;
      url: string;
      text: string;
    }

    export class AlchemyLanguage {
      text(params: TextOptions, callback?: (err: Error) => any): void;
      text(params: TextOptions, callback?: (err: Error | null, res: string) => any): void;
    }

    export function alchemy_language(options: AlchemyLanguageOptions): AlchemyLanguage;
  }

  export = watson;
}
