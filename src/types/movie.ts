// Extended single movie interface with optional detailed fields
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  adult: boolean;
  video: boolean;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date: string; // "YYYY-MM-DD"
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids?: number[]; // present in list endpoints

  // Optional detailed fields
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string;
  imdb_id?: string;
  origin_country?: string[];
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status?: string;
  tagline?: string;
}
