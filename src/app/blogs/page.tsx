import type { Metadata } from "next";
import { BlogList } from "./blog-list";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blogs - Visakh Unni",
  description: "Writings on critical thinking, engineering, and technology.",
};

export default function BlogIndex() {
  return (
    <section className="mx-auto max-w-3xl pb-16 pt-24">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Blogs
      </h1>
      <BlogList posts={posts} />
    </section>
  );
}
