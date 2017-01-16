export interface MangaCover {
  /**
   * The manga's title.
   */
  title: string;

  /**
   * The first volume's front cover URL.
   */
  coverUrl: string;

  /**
   * All known covers.
   * NOTE: for the moment, not used by the API.
   */
  covers?: string[];
}
