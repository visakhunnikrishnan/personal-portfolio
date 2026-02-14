"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function BlogImageLightbox({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const getEligibleImages = useCallback((): HTMLImageElement[] => {
    if (!containerRef.current) return [];
    const article = containerRef.current.querySelector("article");
    if (!article) return [];
    return Array.from(article.querySelectorAll("img")).filter(
      (img) => !img.closest("a")
    );
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName !== "IMG") return;
      if (target.closest("a")) return;

      const article = container!.querySelector("article");
      if (!article || !article.contains(target)) return;

      const eligible = getEligibleImages();
      const srcs = eligible.map((img) => img.currentSrc || img.src);
      const idx = eligible.indexOf(target as HTMLImageElement);
      if (idx === -1) return;

      setImages(srcs);
      setCurrent(idx);
      setOpen(true);
    }

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [getEligibleImages]);

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
    <div ref={containerRef} className="blog-lightbox-container">
      <style jsx global>{`
        .blog-lightbox-container article img:not(a img) {
          cursor: pointer;
        }
      `}</style>
      {children}

      {open && images.length > 0 && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/70 transition-colors hover:text-white"
            onClick={close}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
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
          )}

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[current]}
              alt=""
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
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
          )}

          {/* Counter */}
          {images.length > 1 && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {current + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
