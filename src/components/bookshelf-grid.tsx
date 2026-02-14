"use client";

import { useState, useEffect, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";

interface Book {
  title: string;
  author: string;
  image: StaticImageData;
  description: string;
}

interface BookshelfGridProps {
  heroImg: StaticImageData;
  books: Book[];
}

export function BookshelfGrid({ heroImg, books }: BookshelfGridProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? books.length - 1 : c - 1));
  }, [books.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === books.length - 1 ? 0 : c + 1));
  }, [books.length]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5">
        {/* Hero image — static, not clickable */}
        <div className="group relative overflow-hidden rounded-md">
          <Image
            src={heroImg}
            alt="Visakh with his book collection"
            className="aspect-[2/3] w-full object-cover"
            priority
            placeholder="blur"
          />
        </div>

        {/* Book cards */}
        {books.map((book, i) => (
          <button
            key={book.title}
            className="group relative cursor-pointer overflow-hidden rounded-md text-left"
            onClick={() => {
              setCurrent(i);
              setOpen(true);
            }}
          >
            <Image
              src={book.image}
              alt={book.title}
              className="aspect-[2/3] w-full object-cover"
              placeholder="blur"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <h2 className="text-xs font-semibold leading-tight text-white sm:text-sm">
                {book.title}
              </h2>
              <p className="mt-0.5 text-[10px] text-white/70 sm:text-xs">
                {book.author}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition-colors hover:text-white"
            onClick={close}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 rounded-full p-2 text-white/70 transition-colors hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous book"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          {/* Content */}
          <div
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4 overflow-y-auto px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={books[current].image}
              alt={books[current].title}
              className="max-h-[55vh] w-auto rounded-lg object-contain"
              placeholder="blur"
            />
            <div className="max-w-md text-center">
              <h2 className="text-lg font-bold text-white">
                {books[current].title}
              </h2>
              <p className="mt-0.5 text-sm text-white/60">
                {books[current].author}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {books[current].description}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 rounded-full p-2 text-white/70 transition-colors hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next book"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          {/* Counter */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {current + 1} / {books.length}
          </span>
        </div>
      )}
    </>
  );
}
