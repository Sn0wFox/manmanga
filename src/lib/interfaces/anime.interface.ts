import { Manga }  from './manga.interface';

export interface Anime {
  /**
   * The title of the anime.
   * Expected to be found for each anime.
   */
  title: string;

  /**
   * The associated manga,
   * if the anime is based on a manga.
   */
  // TODO: not used at the moment
  manga?: Manga;

  /**
   * The anime's author.
   */
  author?: string;

  /**
   * An abstract of this anime.
   */
  abstract?: string;

  /**
   * The number of episodes.
   */
  episodes?: number;

  /**
   * A known director.
   */
  director?: string;

  /**
   * A known music composer.
   */
  musicComposer?: string;

  /**
   * The list of known networks
   * thanks to which the anime is airing.
   */
  networks?: string[];

  /**
   * An URL to the poster.
   */
  posterUrl?: string;

  /**
   * The list of all known genres for this anime.
   */
  genres?: string[];
}
