import Image from "next/image";
import Link from "next/link";
import profileImg from "../../public/visakh-unni.avif";

import heroBilt from "../../public/blog/why-india-needs-its-own-bilt-rewards/real-estate.webp";
import hero0 from "../../public/blog/a-quantitative-approach-to-personalized-investment-planning/boy-saving-coin-piggy-bank.webp";
import heroNewborn from "../../public/blog/what-i-learned-in-my-first-week-as-a-new-parent/baby.webp";
import heroGameTheory from "../../public/blog/understanding-game-theory-how-strategic-thinking-shapes-our-world/nash-equilibrium.webp";
import heroMeditation from "../../public/blog/the-science-of-meditation/meditation.webp";
import heroAGI from "../../public/blog/intelligence-measurement-and-the-path-to-agi/intelligence.webp";
import heroAiNative from "../../public/blog/ai-native-software-engineering/ai-native-sw-eng.webp";
import heroJournaling from "../../public/blog/journaling/journaling.webp";
import heroIems from "../../public/blog/how-to-choose-iems/audiophile-swirl.webp";
import heroTsanomaly from "../../public/blog/tsanomaly/tsanomaly-banner.webp";
import hero17 from "../../public/blog/the-hidden-connections-understanding-the-world-through-systems-thinking/industrial-plant-with-blueprint-overlay.webp";
import hero18 from "../../public/blog/silence-stories-and-strategies-the-jeff-bezos-method-for-transforming-dialogue-in-the-boardroom/executives-at-boardroom-meeting.webp";
import hero19 from "../../public/blog/beyond-goals-how-okrs-foster-growth-and-innovation/exploding-ideas-from-mind-collage.webp";
import hero20 from "../../public/blog/data-storytelling/data-storytelling-cover.webp";
import hero21 from "../../public/blog/first-principles/first-principles-thinking-cover.webp";

const featuredPosts = [
  {
    slug: "tsanomaly",
    title: "tsanomaly: A Generic Framework for Time-Series Anomaly Detection",
    date: "Jul 19, 2026",
    readTime: "8 min read",
    image: heroTsanomaly,
    tag: "Data",
  },
  {
    slug: "how-to-choose-iems",
    title: "Notes on IEMs",
    date: "Jul 3, 2026",
    readTime: "9 min read",
    image: heroIems,
    tag: "Audio",
  },
  {
    slug: "journaling",
    title: "Journalling",
    date: "May 2, 2026",
    readTime: "16 min read",
    image: heroJournaling,
    tag: "Health",
  },
  {
    slug: "ai-native-software-engineering",
    title: "AI-Native Software Engineering",
    date: "Apr 2, 2026",
    readTime: "27 min read",
    image: heroAiNative,
    tag: "Software Engineering",
  },
  {
    slug: "what-i-learned-in-my-first-week-as-a-new-parent",
    title: "What I Learned in My First Month as a New Parent",
    date: "Mar 31, 2026",
    readTime: "28 min read",
    image: heroNewborn,
    tag: "Parenting",
  },
  {
    slug: "intelligence-measurement-and-the-path-to-agi",
    title: "Measuring Machine Intelligence",
    date: "Mar 20, 2026",
    readTime: "28 min read",
    image: heroAGI,
    tag: "AI",
  },
  {
    slug: "why-india-needs-its-own-bilt-rewards",
    title: "Why India Needs Its Own Bilt Rewards, And Why It Could Be Even Bigger",
    description:
      "How Bilt Rewards turned rent into a wealth-building tool in the US, and why the same opportunity exists in India with UPI and a $170 billion rental market.",
    date: "Mar 7, 2026",
    readTime: "18 min read",
    image: heroBilt,
    tag: "Fintech",
  },
  {
    slug: "the-science-of-meditation",
    title: "The Science of Meditation",
    date: "Feb 10, 2026",
    readTime: "30 min read",
    image: heroMeditation,
    tag: "Health",
  },
  {
    slug: "understanding-game-theory-how-strategic-thinking-shapes-our-world",
    title: "Understanding Game Theory: How Strategic Thinking Shapes Our World",
    date: "Jan 23, 2026",
    readTime: "24 min read",
    image: heroGameTheory,
    tag: "Strategy",
  },
  {
    slug: "a-quantitative-approach-to-personalized-investment-planning",
    title: "A Quantitative Approach to Personalized Investment Planning",
    date: "Jan 29, 2025",
    readTime: "24 min read",
    image: hero0,
    tag: "Strategy",
  },
  {
    slug: "the-hidden-connections-understanding-the-world-through-systems-thinking",
    title: "The Hidden Connections: Understanding the World Through Systems Thinking",
    description:
      "This article explores the application of systems thinking in solving complex problems, examining how components of a system influence each o",
    date: "Nov 16, 2023",
    readTime: "16 min read",
    image: hero17,
    tag: "Systems Thinking",
  },
  {
    slug: "silence-stories-and-strategies-the-jeff-bezos-method-for-transforming-dialogue-in-the-boardroom",
    title:
      "Silence, Stories, and Strategies: The Jeff Bezos Method for Transforming Dialogue in the Boardroom",
    description:
      "Moving Beyond Monologues with Insights from 'The Bezos Blueprint' for Productive Meetings.",
    date: "Aug 19, 2023",
    readTime: "9 min read",
    image: hero18,
    tag: "Strategy",
  },
  {
    slug: "beyond-goals-how-okrs-foster-growth-and-innovation",
    title: "Beyond Goals: How OKRs Foster Growth and Innovation",
    description:
      "This article delves into the frameworks of OKRs and CFRs, initially introduced by Intel's former CEO Andrew Grove and subsequently populariz",
    date: "May 22, 2023",
    readTime: "15 min read",
    image: hero19,
    tag: "Strategy",
  },
  {
    slug: "from-numbers-to-narratives-the-ux-of-storytelling-with-data",
    title: "From Numbers to Narratives: The UX of Storytelling with Data",
    description:
      "Delving into the UX aspects of data visualization, drawing inspiration from Don Norman and Edward Tufte.",
    date: "Mar 10, 2023",
    readTime: "13 min read",
    image: hero20,
    tag: "UX",
  },
  {
    slug: "beyond-the-obvious-seeing-through-the-lens-of-first-principles",
    title: "Beyond the Obvious: Seeing Through the Lens of First Principles",
    description:
      "To get past biases, we need a careful and thoughtful approach called first principles thinking.",
    date: "Aug 3, 2022",
    readTime: "9 min read",
    image: hero21,
    tag: "Critical Thinking",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col-reverse items-center gap-12 pb-14 pt-28 md:flex-row md:gap-16 md:pt-32">
        <div className="max-w-xl flex-1 space-y-8">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Hi,
            <br />
            I&rsquo;m{" "}
Visakh Unni
          </h1>

          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&rsquo;m a Research engineer who enjoys hidden pattern mining,
              parallel computing and data storytelling with visualizations.
            </p>
            <p>
              Nowadays, exploring the synergies between internal developer
              platforms and DevOps, enhancing both the development process and
              operational workflows.
            </p>
            <p className="text-base">
              Welcome to my corner of the internet. I&rsquo;m glad you&rsquo;re
              here!
            </p>
          </div>
        </div>

        <div className="w-full max-w-xs shrink-0 sm:max-w-sm lg:max-w-md">
          <Image
            src={profileImg}
            alt="Visakh Unni"
            priority
            className="w-full rounded-2xl object-cover shadow-xl shadow-black/10 dark:shadow-black/30"
          />
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="border-t border-border/40 pb-20 pt-10">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          From the <span className="italic">Blog</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
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
                <span className="mb-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {post.tag}
                </span>
                <h3 className="mb-2 text-sm font-semibold leading-snug group-hover:underline">
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

        <div className="mt-10 text-center">
          <Link
            href="/blogs"
            className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            View all posts
          </Link>
        </div>
      </section>
    </>
  );
}
