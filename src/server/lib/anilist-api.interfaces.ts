export interface AuthToken {
  // Long string
  access_token: string;

  // "bearer"
  token_type: string;

  // Timestamp in seconds
  expires: number;

  // Seconds
  expires_in: number;
}

export interface Manga {
  id: number;
  title_romaji: string;
  title_english: string;
  title_japanese: string;
  type?: string;
  series_type?: string;
  start_date?: Date;
  end_date?: Date;
  start_date_fuzzy?: number;
  end_date_fuzzy?: number;
  season?: number;
  description?: string;
  adult?: boolean;
  average_score?: number;
  popularity?: number;
  favourite?: boolean;
  image_url_sml?: string;
  image_url_med?: string;
  image_url_lge?: string;
  image_url_banner?: any;
  genres?: string[];
  synonyms?: string[];
  youtube_id?: string;
  hashtag?: string;
  updated_at?: number;
  score_distribution?: ScoreDistribution;
  list_stats?: ListStats;
  total_chapters?: number;
  total_volumes?: number;
  publishing_status?: string;
}

export interface Anime {
  id: number;
  title_romaji: string;
  title_english: string;
  title_japanese: string;
  type?: string;
  series_type?: string;
  start_date?: Date;
  end_date?: Date;
  start_date_fuzzy?: number;
  end_date_fuzzy?: number;
  season?: number;
  description?: string;
  adult?: boolean;
  average_score?: number;
  popularity?: number;
  favourite?: boolean;
  image_url_sml?: string;
  image_url_med?: string;
  image_url_lge?: string;
  image_url_banner?: string;
  genres?: string[];
  synonyms?: string[];
  youtube_id?: string;
  hashtag?: string;
  updated_at?: number;
  score_distribution?: ScoreDistribution;
  list_stats?: ListStats;
  total_episodes?: number;
  duration?: number;
  airing_status?: string;
  source?: null;
  classification?: string;
  airing_stats?: string[];
  actors?: Staff[];
}

export interface Character {
  id: number;
  name_first: string;
  name_last: string;
  name_japanese: string;
  name_alt?: string;
  info?: string;
  favourite?: boolean;
  image_url_lge?: string;
  image_url_med?: string;
  manga?: Manga[];
  anime?: Anime[];
}

export interface Staff {
  id: number;
  name_first: string;
  name_last: string;
  name_first_japanese?: string;
  name_last_japanese?: string;
  info?: string;
  language?: string;
  favourite?: boolean;
  image_url_lge?: string;
  image_url_med?: string;
  dob?: number;
  website?: string;
  role?: string;
  link_id?: number;
}

export interface Studio {
  id: number;
  studio_name: string;
  studio_wiki?: string;
  favourite?: boolean;
}

export interface ScoreDistribution {
  "10"?: number;
  "20"?: number;
  "30"?: number;
  "40"?: number;
  "50"?: number;
  "60"?: number;
  "70"?: number;
  "80"?: number;
  "90"?: number;
  "100"?: number;
}

export interface ListStats {
  completed?: number;
  on_hold?: number;
  dropped?: number;
  plan_to_read?: number;
  reading?: number;
}
