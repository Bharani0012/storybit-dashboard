"use client";

import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="min-w-[150px]">
      <div className="relative w-[150px] h-[220px] rounded-md overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title || "Movie"}
          fill
          className="object-cover"
        />
      </div>
    </Link>
  );
}
