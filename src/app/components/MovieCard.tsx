"use client";

import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="relative w-[150px] h-[220px] rounded-lg overflow-hidden transform transition duration-300 hover:scale-110 hover:-translate-y-2 hover:z-10 hover:shadow-2xl">
        <Image
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title || "Movie poster"}
          fill
          className="object-cover"
        />
      </div>
    </Link>
  );
}
