"use client";

import { useRef, useState, useEffect } from "react";
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

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setAtStart(scrollLeft <= 0);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
  }, [movies]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" });
  };

  if (isLoading) return <RowSkeleton />;

  return (
    <section className="mt-10 px-6">
      <h3 className="text-xl font-semibold mb-3">{categoryTitle}</h3>

      <div className="relative group w-full">
        {!atStart && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="w-full flex gap-4 overflow-x-auto scroll-smooth pr-4 no-scrollbar"
        >
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>

        {!atEnd && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </section>
  );
}
