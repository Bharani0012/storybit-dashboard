import Image from "next/image";
import Link from "next/link";
import { fetchMovieById, fetchMovieVideos } from "@/lib/tmdb";

export default async function MovieDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const movie = await fetchMovieById(id);
  const videos = await fetchMovieVideos(id);

  type Video = {
    id?: string;
    key?: string;
    name?: string;
    site?: string;
    type?: string;
  };

  const trailer = videos.results?.find(
    (v: Video) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <main className="min-h-screen bg-background text-foreground px-6 pt-24 pb-16">

      <Link
        href="/"
        className="inline-block mb-8 text-sm bg-foreground/10 hover:bg-foreground/20 px-4 py-2 rounded-full transition"
      >
        ← Back
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="relative w-full h-[450px] md:h-[600px] rounded-lg overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${
              movie.poster_path || movie.backdrop_path
            }`}
            alt={movie.title}
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{movie.title}</h1>

          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              className="self-start mb-6 bg-red-600 hover:bg-red-700 text-white font-semibold 
                        px-5 py-2 rounded-full text-center"
            >
              ▶ Watch Trailer
            </a>
          )}

          <p className="text-foreground/70 mb-6 leading-relaxed">
            {movie.overview}
          </p>

          <div className="space-y-2 text-sm text-foreground/60">
            {movie.release_date && (
              <p>
                <span className="font-semibold text-foreground">Release Date:</span>{" "}
                {movie.release_date}
              </p>
            )}

            {movie.vote_average && (
              <p>
                <span className="font-semibold text-foreground">Rating:</span>{" "}
                {movie.vote_average.toFixed(1)}
              </p>
            )}

            {movie.genres && (
              <p>
                <span className="font-semibold text-foreground">Genres:</span>{" "}
                {movie.genres.map((g: { name: string }) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
