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

  const heroMovie = popular.results[0];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroBanner movie={heroMovie} />

      <MovieRow movies={popular.results} categoryTitle="Popular" />
      <MovieRow movies={topRated.results} categoryTitle="Top Rated" />
      <MovieRow movies={upcoming.results} categoryTitle="Upcoming" />
    </main>
  );
}
