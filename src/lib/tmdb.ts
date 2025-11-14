import { MovieResponse } from "@/types/movie";

const BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("Missing TMDB_API_KEY in environment variables");
}

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const fetchPopular = () =>
  safeFetch<MovieResponse>(`${BASE}/movie/popular?api_key=${API_KEY}`);

export const fetchTopRated = () =>
  safeFetch<MovieResponse>(`${BASE}/movie/top_rated?api_key=${API_KEY}`);

export const fetchUpcoming = () =>
  safeFetch<MovieResponse>(`${BASE}/movie/upcoming?api_key=${API_KEY}`);

export const fetchMovieById = (id: string) =>
  safeFetch(`${BASE}/movie/${id}?api_key=${API_KEY}`);

export const fetchMovieVideos = (id: string) =>
  safeFetch(`${BASE}/movie/${id}/videos?api_key=${API_KEY}`);
