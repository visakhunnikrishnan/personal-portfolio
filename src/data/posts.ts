import type { StaticImageData } from "next/image";

import hero0 from "../../public/blog/a-quantitative-approach-to-personalized-investment-planning/boy-saving-coin-piggy-bank.webp";
import hero1 from "../../public/blog/deep-dive-into-concurrency/runners-at-starting-line.webp";
import hero2 from "../../public/blog/crafting-actionable-it-alerts-a-developer-s-guide-to-effective-monitoring/vintage-camera-hands-closeup.webp";
import hero3 from "../../public/blog/disposability-in-software-development/technician-at-server-rack.webp";
import hero4 from "../../public/blog/embracing-config-flexibility/developers-at-config-cafe.webp";
import hero5 from "../../public/blog/on-dependency-management/chain-links-closeup.webp";
import hero6 from "../../public/blog/one-off-admin-processes/technician-in-server-room.webp";
import hero7 from "../../public/blog/port-binding-strategies/cat-beside-network-cables.webp";
import hero8 from "../../public/blog/simplifying-application-logging/aerial-view-feet-over-city.webp";
import hero9 from "../../public/blog/the-codebase-principle/retro-terminal-version-control.webp";
import hero10 from "../../public/blog/the-dev-prod-parity/golden-nebula-space-explosion.webp";
import hero11 from "../../public/blog/the-rise-of-self-service-platforms-and-backstage-framework/developers-working-in-open-office.webp";
import hero12 from "../../public/blog/the-sast-ecosystem/developer-analyzing-charts-on-monitor.webp";
import hero13 from "../../public/blog/the-stateless-processes/person-floating-among-laptops.webp";
import hero14 from "../../public/blog/three-stages-of-app-deployment-build-release-and-run/abstract-silhouette-profiles-illustration.webp";
import hero15 from "../../public/blog/understanding-backing-services/abstract-colorful-circles-black-background.webp";
import hero16 from "../../public/blog/understanding-sboms-a-developer-s-guid/developer-with-cat-at-computer.webp";
import hero17 from "../../public/blog/the-hidden-connections-understanding-the-world-through-systems-thinking/industrial-plant-with-blueprint-overlay.webp";
import hero18 from "../../public/blog/silence-stories-and-strategies-the-jeff-bezos-method-for-transforming-dialogue-in-the-boardroom/executives-at-boardroom-meeting.webp";
import hero19 from "../../public/blog/beyond-goals-how-okrs-foster-growth-and-innovation/exploding-ideas-from-mind-collage.webp";
import hero20 from "../../public/blog/data-storytelling/data-storytelling-cover.webp";
import hero21 from "../../public/blog/first-principles/first-principles-thinking-cover.webp";
import hero22 from "../../public/blog/why-india-needs-its-own-bilt-rewards/real-estate.webp";
import hero23 from "../../public/blog/what-i-learned-in-my-first-week-as-a-new-parent/baby.webp";
import hero24 from "../../public/blog/understanding-game-theory-how-strategic-thinking-shapes-our-world/nash-equilibrium.webp";
import hero25 from "../../public/blog/the-science-of-meditation/meditation.webp";
import hero26 from "../../public/blog/intelligence-measurement-and-the-path-to-agi/intelligence.webp";
import hero27 from "../../public/blog/ai-native-software-engineering/ai-native-sw-eng.webp";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: StaticImageData;
  tags: string[];
}

export const posts: Post[] = [
  {
    slug: "ai-native-software-engineering",
    title: "AI-Native Software Engineering",
    description:
      "What changes when AI writes most of the code - the productivity paradox, the new developer skillset, and how Anthropic, Stripe, and others are rebuilding software engineering from the ground up.",
    date: "Apr 2, 2026",
    readTime: "27 min read",
    image: hero27,
    tags: ["AI", "Software Engineering"],
  },
  {
    slug: "intelligence-measurement-and-the-path-to-agi",
    title: "Measuring Machine Intelligence",
    description:
      "What intelligence actually means, how we measure it in humans and machines, and where we really stand on the road to AGI - the definitions, the benchmarks, and the open questions.",
    date: "Mar 20, 2026",
    readTime: "28 min read",
    image: hero26,
    tags: ["AI", "Science"],
  },
  {
    slug: "the-science-of-meditation",
    title: "The Science of Meditation",
    description:
      "What 30,000 studies reveal about meditation's effects on your brain, stress, and mental health - the evidence, the mechanisms, and the risks nobody talks about.",
    date: "Feb 10, 2026",
    readTime: "30 min read",
    image: hero25,
    tags: ["Health", "Science"],
  },
  {
    slug: "what-i-learned-in-my-first-week-as-a-new-parent",
    title: "What I Learned in My First Month as a New Parent",
    description: "Notes from a first-time parent on newborn feeding, sleep, and postpartum nutrition - what the research says and what actually helped.",
    date: "Mar 31, 2026",
    readTime: "28 min read",
    image: hero23,
    tags: ["Parenting", "Health"],
  },
  {
    slug: "why-india-needs-its-own-bilt-rewards",
    title: "Why India Needs Its Own Bilt Rewards, And Why It Could Be Even Bigger",
    description: "How Bilt Rewards turned rent into a wealth-building tool in the US, why the same opportunity exists in India with UPI and a $170 billion rental market, and what the regulatory landscape means for anyone building in this space.",
    date: "Mar 7, 2026",
    readTime: "18 min read",
    image: hero22,
    tags: ["Strategy", "Finance"],
  },
  {
    slug: "understanding-game-theory-how-strategic-thinking-shapes-our-world",
    title: "Understanding Game Theory: How Strategic Thinking Shapes Our World",
    description:
      "From the Prisoner's Dilemma to AI development, discover how game theory reveals the hidden logic behind decision-making in politics, business, and everyday life.",
    date: "Jan 23, 2026",
    readTime: "24 min read",
    image: hero24,
    tags: ["Strategy", "Mathematics"],
  },
  {
    slug: "a-quantitative-approach-to-personalized-investment-planning",
    title: "A Quantitative Approach to Personalized Investment Planning",
    description: "Defining Financial Goals and Investment HorizonTime Value of Money (TVM) Calculations: To estimate the future value of current savings and investments or the amount needed to save to meet a financial",
    date: "Jan 29, 2025",
    readTime: "24 min read",
    image: hero0,
    tags: ["Strategy", "Finance"],
  },
  {
    slug: "deep-dive-into-concurrency",
    title: "Concurrency",
    description: "Why scaling means running more processes and not bigger ones, how to split work across web, worker, and clock process types, and practical patterns for horizontal scaling with Gunicorn, Celery, and Kubernetes.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero1,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "crafting-actionable-it-alerts-a-developer-s-guide-to-effective-monitoring",
    title: "Crafting Actionable IT Alerts: A Developer's Guide to Effective Monitoring",
    description: "How to build alerting systems that catch real problems without drowning your team in noise - lessons from Google SRE on symptoms vs causes, the four golden signals, and alert design.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero2,
    tags: ["DevOps", "SRE"],
  },
  {
    slug: "disposability-in-software-development",
    title: "Disposability in Software Development",
    description: "Why your processes should start fast and shut down cleanly, what happens when they do not, and practical patterns for handling SIGTERM, draining connections, and designing for crash safety in containers.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero3,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "embracing-config-flexibility",
    title: "Embracing Config Flexibility",
    description: "Why configuration should live in the environment and never in code, what breaks when database URLs and API keys are hardcoded, and practical patterns for managing config across development, staging, and production.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero4,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "on-dependency-management",
    title: "On Dependency Management",
    description: "Why every dependency should be explicitly declared and isolated, what breaks when applications rely on globally installed packages, and how virtual environments, lock files, and containers solve this.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero5,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "one-off-admin-processes",
    title: "One-Off Admin Processes",
    description: "Why admin tasks like database migrations and data fixes should run as one-off processes in the same environment as your application, what breaks when they do not, and how to run them safely in containers and production.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero6,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "port-binding-strategies",
    title: "Port Binding Strategies",
    description: "Why your application should bind to a port and serve requests directly, what changes when you stop deploying into external web servers, and how port binding works with Docker, reverse proxies, and cloud platforms.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero7,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "simplifying-application-logging",
    title: "Simplifying Application Logging",
    description: "Why your application should write logs to stdout and nothing else, what happens when applications manage their own log files, and how structured logging and log aggregation work in modern deployments.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero8,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "the-codebase-principle",
    title: "The Codebase Principle",
    description: "Why one repository should produce every deploy, what happens when codebases drift apart, and how to keep development, staging, and production running the same code.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero9,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "the-dev-prod-parity",
    title: "The Dev/Prod Parity",
    description: "Why 'works on my machine' is a design problem, the three gaps that cause dev/prod drift, and practical strategies for making your environments behave the same way.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero10,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "the-rise-of-self-service-platforms-and-backstage-framework",
    title: "Building Self-Service Platforms That Developers Actually Use",
    description: "Why platform engineering matters, how self-service portals and CLIs reduce developer cognitive load, and the practical lessons from building internal developer platforms.",
    date: "Jan 29, 2025",
    readTime: "16 min read",
    image: hero11,
    tags: ["Platform Engineering", "DevOps"],
  },
  {
    slug: "the-sast-ecosystem",
    title: "A Developer's Guide to Static Analysis",
    description: "How static analysis tools find bugs before they ship, the false positive problem every team faces, and practical strategies for making SAST work without slowing you down.",
    date: "Jan 29, 2025",
    readTime: "14 min read",
    image: hero12,
    tags: ["Security", "DevOps"],
  },
  {
    slug: "the-stateless-processes",
    title: "The Stateless Processes",
    description: "Why your application processes should not store anything locally, what happens when stateful processes meet horizontal scaling, and practical patterns for moving state out of your app.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero13,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "three-stages-of-app-deployment-build-release-and-run",
    title: "Three Stages of App Deployment: Build, Release, and Run",
    description: "Why separating build, release, and run stages matters, what immutable releases actually look like in practice, and how this structure makes rollbacks trivial and deployments predictable.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero14,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "understanding-backing-services",
    title: "Understanding Backing Services",
    description: "Why your application shouldn't care where its dependencies live, how connection strings encode entire relationships, and the resilience patterns that matter when services go down.",
    date: "Jan 29, 2025",
    readTime: "10 min read",
    image: hero15,
    tags: ["DevOps", "Twelve-Factor"],
  },
  {
    slug: "understanding-sboms-a-developer-s-guid",
    title: "Third-Party Dependency Management: A Developer's Guide",
    description: "How SBOMs help you track what's in your software, why regulations now require them with real penalties, and the practical path to managing third-party dependencies.",
    date: "Jan 29, 2025",
    readTime: "20 min read",
    image: hero16,
    tags: ["Security", "DevOps"],
  },
  {
    slug: "the-hidden-connections-understanding-the-world-through-systems-thinking",
    title: "The Hidden Connections: Understanding the World Through Systems Thinking",
    description: "How systems thinking helps us see the connections between things, understand feedback loops and leverage points, and avoid the traps that come from fixing problems in isolation.",
    date: "Nov 16, 2023",
    readTime: "12 min read",
    image: hero17,
    tags: ["Systems Thinking", "Critical Thinking"],
  },
  {
    slug: "silence-stories-and-strategies-the-jeff-bezos-method-for-transforming-dialogue-in-the-boardroom",
    title: "Silence, Stories, and Strategies: The Jeff Bezos Method for Transforming Dialogue in the Boardroom",
    description: "How Amazon replaced PowerPoint with narrative memos, silent reading, and structured discussion to make meetings actually productive.",
    date: "Aug 19, 2023",
    readTime: "9 min read",
    image: hero18,
    tags: ["Strategy", "Leadership"],
  },
  {
    slug: "beyond-goals-how-okrs-foster-growth-and-innovation",
    title: "Beyond Goals: How OKRs Foster Growth and Innovation",
    description: "How OKRs and CFRs, pioneered by Andrew Grove at Intel and popularized by John Doerr at Google, create focus, alignment, and a culture of ambitious goal-setting.",
    date: "May 22, 2023",
    readTime: "12 min read",
    image: hero19,
    tags: ["Strategy", "Leadership"],
  },
  {
    slug: "from-numbers-to-narratives-the-ux-of-storytelling-with-data",
    title: "From Numbers to Narratives: The UX of Storytelling with Data",
    description: "Delving into the UX aspects of data visualization, drawing inspiration from Don Norman and Edward Tufte.",
    date: "Mar 10, 2023",
    readTime: "10 min read",
    image: hero20,
    tags: ["UX", "Data"],
  },
  {
    slug: "beyond-the-obvious-seeing-through-the-lens-of-first-principles",
    title: "Beyond the Obvious: Seeing Through the Lens of First Principles",
    description: "To get past biases, we need a careful and thoughtful approach called first principles thinking.",
    date: "Aug 3, 2022",
    readTime: "9 min read",
    image: hero21,
    tags: ["Critical Thinking", "Strategy"],
  },
];
