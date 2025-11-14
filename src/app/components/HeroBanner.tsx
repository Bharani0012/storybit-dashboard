import Image from "next/image";
import { Movie } from "@/types/movie";

export default function HeroBanner({ movie }: { movie: Movie }) {
  if (!movie) return null;

  const banner = movie.backdrop_path || movie.poster_path;

  return (
    <section className="relative w-full h-[500px] mt-16">
      <Image
        src={`https://image.tmdb.org/t/p/original${banner}`}
        alt={movie.title || movie.name || "Movie"}
        fill
        priority
        className="object-cover brightness-75"
      />

      <div
        className="
          absolute bottom-10 left-10 max-w-xl p-6 rounded-lg 
          text-foreground
          bg-[rgba(255,255,255,0.25)] dark:bg-[rgba(0,0,0,0.75)]
          backdrop-blur-sm
        "
      >
        <h2 className="text-4xl font-bold mb-4  bg-opacity-20">
          {movie.title || movie.name}
        </h2>
        <p className="text-sm opacity-80">{movie.overview}</p>
      </div>
    </section>
  );
}
