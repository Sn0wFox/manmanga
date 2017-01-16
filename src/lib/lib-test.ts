import * as Bluebird from "bluebird";

export function myFunction(): Bluebird<string> {
  return Bluebird.delay(250, "Hello from myLib");
}