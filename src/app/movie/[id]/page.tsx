import Image from "next/image";
import { fetchMovieById } from "@/lib/tmdb";

export default async function MovieDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; // <-- FIX 🔥
  const movie = await fetchMovieById(id);

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="relative w-full h-[450px] md:h-[600px] rounded-lg overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${
              movie.poster_path || movie.backdrop_path
            }`}
            alt={movie.title}
            fill
            priority
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <p className="text-gray-300 mb-6 leading-relaxed">
            {movie.overview}
          </p>

          <div className="space-y-2 text-sm text-gray-400">
            {movie.release_date && (
              <p>
                <span className="font-semibold text-white">Release Date:</span>{" "}
                {movie.release_date}
              </p>
            )}

            {movie.vote_average && (
              <p>
                <span className="font-semibold text-white">Rating:</span>{" "}
                {movie.vote_average.toFixed(1)}
              </p>
            )}

            {movie.genres && (
              <p>
                <span className="font-semibold text-white">Genres:</span>{" "}
                {movie.genres.map((g: any) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
