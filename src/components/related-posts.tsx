import Link from "next/link";
import Image from "next/image";
import { posts } from "@/data/posts";

export function RelatedPosts({ slug }: { slug: string }) {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return null;

  const currentTags = new Set(current.tags);

  const related = posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      ...p,
      score: p.tags.filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <section className="mt-16 border-t border-border/40 pt-10">
      <h2 className="mb-6 text-lg font-semibold tracking-tight">
        More from the blogs
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group overflow-hidden rounded-lg border border-border/60 transition-all hover:border-border hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20"
          >
            <div className="overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder="blur"
              />
            </div>
            <div className="p-3">
              <h3 className="mb-1 line-clamp-2 text-sm font-medium leading-snug group-hover:underline">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time>{post.date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
