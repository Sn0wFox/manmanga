import { Character }  from './character.interface';

export interface Manga {
  /**
   * The title of the manga.
   * Expected to be found for each manga.
   */
  title: string;

  /**
   * An abstract of this manga.
   */
  abstract?: string;

  /**
   * The main author's name.
   */
  author?: string;

  /**
   * The list of all known illustrators' names.
   */
  illustrator?: string;

  /**
   * The list of all known characters.
   */
  // TODO: not used for the moment
  characters?: Character[];

  /**
   * An URL to one cover.
   */
  coverUrl?: string;

  /**
   * The list of all known genres for this manga.
   */
  genres?: string[];

  /**
   * The number of edited volumes.
   */
  volumes?: number;

  /**
   * The list of known magazines
   * where the manga has been published.
   */
  magazines?: string[];

  /**
   * The first publication date.
   */
  publicationDate?: string; // TODO: use Date object

  /**
   * A known publisher.
   */
  publisher?: string;
}
