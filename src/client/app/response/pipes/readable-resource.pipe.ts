import { Pipe }           from '@angular/core';
import { PipeTransform }  from '@angular/core';

@Pipe({
  name: 'readableResource'
})
export class ReadableResourcePipe implements PipeTransform {
  /**
   * Transforms a DbPedia resource's URL into a human readable name.
   * @param resourceUrl The url to transform.
   * @returns {string}
   */
  public transform(resourceUrl: string): string {
    return resourceUrlToResource(resourceUrl);
  }
}

// TODO: improve that, cause that's pretty ugly
function resourceUrlToResource(url: string): string {
  return url
    .replace('http://dbpedia.org/resource/', '')
    .replace(/_/g, ' ');
}