"use client";

import { useState, useEffect, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";

const layouts = [
  "", // g1 - small
  "", // g2 - small
  "col-span-2", // g3 - wide
  "col-span-2", // g4 - wide
  "", // g5 - small
  "", // g6 - small
  "", // g7 - small
  "col-span-2", // g8 - wide
  "", // g9 - small
];

export function PhotoGallery({ images }: { images: StaticImageData[] }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

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
      <div className="mt-16 grid auto-rows-[140px] grid-cols-4 gap-1.5 sm:auto-rows-[180px] sm:gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            className={`cursor-pointer overflow-hidden rounded-sm ${layouts[i] ?? ""}`}
            onClick={() => {
              setCurrent(i);
              setOpen(true);
            }}
          >
            <Image
              src={img}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              placeholder="blur"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
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
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt=""
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              placeholder="blur"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 rounded-full p-2 text-white/70 transition-colors hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          {/* Counter */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {current + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
