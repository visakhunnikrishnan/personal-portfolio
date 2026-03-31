import type { Metadata } from "next";
import { BlogList } from "./blog-list";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blogs - Visakh Unni",
  description: "Writings on critical thinking, engineering, and technology.",
  openGraph: {
    title: "Blogs - Visakh Unni",
    description: "Writings on critical thinking, engineering, and technology.",
    url: "https://visakhunni.com/blogs",
    siteName: "Visakh Unni",
    type: "website",
    images: [
      {
        url: "https://visakhunni.com/visakh-unni.avif",
        width: 1200,
        height: 630,
        alt: "Visakh Unni - Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs - Visakh Unni",
    description: "Writings on critical thinking, engineering, and technology.",
    images: [
      "https://visakhunni.com/visakh-unni.avif",
    ],
  },
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
