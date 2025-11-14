import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import { fetchPopular, fetchTopRated, fetchUpcoming } from "@/lib/tmdb";

export default async function Home() {
  const [popular, topRated, upcoming] = await Promise.all([
    fetchPopular(),
    fetchTopRated(),
    fetchUpcoming(),
  ]);

  const safe = <T,>(data: { results?: T[] } | null | undefined): T[] =>
    data?.results ?? [];

  const popularMovies = safe(popular);
  const topRatedMovies = safe(topRated);
  const upcomingMovies = safe(upcoming);

  const heroMovie = popularMovies[0] ?? null;

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {heroMovie && <HeroBanner movie={heroMovie} />}

      {popularMovies.length > 0 && (
        <MovieRow movies={popularMovies} categoryTitle="Popular" />
      )}

      {topRatedMovies.length > 0 && (
        <MovieRow movies={topRatedMovies} categoryTitle="Top Rated" />
      )}

      {upcomingMovies.length > 0 && (
        <MovieRow movies={upcomingMovies} categoryTitle="Upcoming" />
      )}
    </main>
  );
}
