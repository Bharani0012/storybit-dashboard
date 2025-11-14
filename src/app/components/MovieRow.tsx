"use client";

import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import RowSkeleton from "./RowSkeleton";
import { Movie } from "@/types/movie";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MovieRow({
  movies,
  categoryTitle,
}: {
  movies: Movie[];
  categoryTitle: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hovering) return;
    const interval = setInterval(() => {
      scrollRef.current?.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [hovering]);

  if (isLoading) return <RowSkeleton />;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" });
  };

  return (
    <section className="mt-10 px-6">
      <h3 className="text-xl font-semibold mb-3">{categoryTitle}</h3>

      <div
        className="relative group"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden scrollbar-none scroll-smooth pr-4"
        >
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}
