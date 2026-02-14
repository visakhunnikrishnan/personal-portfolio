"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/data/posts";

export function BlogList({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState("All");

  // Collect unique tags sorted by frequency (most posts first)
  const tagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const allTags = [
    "All",
    ...Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag),
  ];

  const filtered =
    activeTag === "All"
      ? posts
      : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      {/* Tag filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              activeTag === tag
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group overflow-hidden rounded-xl border border-border/60 transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
          >
            <div className="overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder="blur"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mb-1 font-semibold leading-snug tracking-tight group-hover:underline">
                {post.title}
              </h2>
              <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                {post.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time>{post.date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
