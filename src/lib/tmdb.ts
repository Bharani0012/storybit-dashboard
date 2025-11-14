import { MovieResponse } from "@/types/movie";

const BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("Missing TMDB_API_KEY in environment variables");
}

export async function fetchPopular(): Promise<MovieResponse> {
  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch popular movies");

  return res.json();
}

export async function fetchTopRated(): Promise<MovieResponse> {
  const res = await fetch(`${BASE}/movie/top_rated?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch top rated movies");

  return res.json();
}

export async function fetchUpcoming(): Promise<MovieResponse> {
  const res = await fetch(`${BASE}/movie/upcoming?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch upcoming movies");

  return res.json();
}

export async function fetchMovieById(id: string) {
  const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);

  return res.json();
}

export async function fetchMovieVideos(id: string) {
  const res = await fetch(`${BASE}/movie/${id}/videos?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
}

