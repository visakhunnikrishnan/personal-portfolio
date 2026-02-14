import type { Metadata } from "next";

import heroImg from "../../../public/bookshelf/hero.jpg";
import measureWhatMatters from "../../../public/bookshelf/measure-what-matters.jpg";
import superintelligence from "../../../public/bookshelf/superintelligence.png";
import designEverydayThings from "../../../public/bookshelf/design-of-everyday-things.png";
import handsOnMl from "../../../public/bookshelf/hands-on-ml.jpg";
import hooked from "../../../public/bookshelf/hooked.webp";
import almanackNaval from "../../../public/bookshelf/almanack-naval.jpeg";
import hbrAt100 from "../../../public/bookshelf/hbr-at-100.jpeg";
import phoenixProject from "../../../public/bookshelf/phoenix-project.jpg";
import criticalThinking from "../../../public/bookshelf/critical-thinking.jpg";
import cleanCode from "../../../public/bookshelf/clean-code.jpeg";
import cleanArchitecture from "../../../public/bookshelf/clean-architecture.jpeg";
import thinkingInSystems from "../../../public/bookshelf/thinking-in-systems.jpg";
import bezosBlueprint from "../../../public/bookshelf/bezos-blueprint.jpg";
import zeroToOne from "../../../public/bookshelf/zero-to-one.jpeg";
import thinkAgain from "../../../public/bookshelf/think-again.jpg";
import googleStory from "../../../public/bookshelf/google-story.jpg";
import leanStartup from "../../../public/bookshelf/lean-startup.jpg";
import platformsEcosystems from "../../../public/bookshelf/platforms-ecosystems.jpg";

import { BookshelfGrid } from "../../components/bookshelf-grid";

export const metadata: Metadata = {
  title: "Bookshelf - Visakh Unni",
  description:
    "A collection of books that have shaped my thinking on engineering, strategy, design, and technology.",
};

const books = [
  {
    title: "Measure What Matters",
    author: "John Doerr",
    image: measureWhatMatters,
    description:
      "The definitive guide to OKRs. Changed how I think about aligning teams around outcomes instead of outputs.",
  },
  {
    title: "Superintelligence",
    author: "Nick Bostrom",
    image: superintelligence,
    description:
      "A rigorous exploration of what happens when machine intelligence surpasses our own. Dense but essential reading for anyone in tech.",
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    image: designEverydayThings,
    description:
      "Permanently rewired how I evaluate interfaces. Every engineer should understand affordances, signifiers, and feedback loops.",
  },
  {
    title: "Hands On Machine Learning",
    author: "Aurelien Geron",
    image: handsOnMl,
    description:
      "The most practical ML reference I own. Great balance of theory and hands-on code with scikit-learn and TensorFlow.",
  },
  {
    title: "Hooked",
    author: "Nir Eyal",
    image: hooked,
    description:
      "A compact model for understanding habit-forming products. Useful both for building engaging experiences and recognizing manipulation.",
  },
  {
    title: "The Almanack Of Naval Ravikant",
    author: "Eric Jorgenson",
    image: almanackNaval,
    description:
      "Distilled wisdom on wealth creation and happiness. Short, re-readable, and surprisingly deep for a curated collection.",
  },
  {
    title: "HBR AT 100",
    author: "Harvard Business Review",
    image: hbrAt100,
    description:
      "A century of management thinking in one volume. Great for dipping into foundational ideas on strategy, leadership, and innovation.",
  },
  {
    title: "The Phoenix Project",
    author: "Gene Kim, George Spafford & Kevin Behr",
    image: phoenixProject,
    description:
      "DevOps principles told as a novel. Makes the case for flow, feedback, and continuous learning in a way that actually sticks.",
  },
  {
    title: "Critical Thinking",
    author: "Tom Chatfield",
    image: criticalThinking,
    description:
      "A practical toolkit for reasoning clearly. Helped me become more deliberate about how I evaluate arguments and evidence.",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    image: cleanCode,
    description:
      "The classic on writing readable, maintainable code. Some opinions are dated, but the core principles remain timeless.",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    image: cleanArchitecture,
    description:
      "Solid mental models for structuring software at scale. The dependency rule alone is worth the read.",
  },
  {
    title: "Thinking In Systems",
    author: "Donella H. Meadows",
    image: thinkingInSystems,
    description:
      "The best introduction to systems thinking. Changed how I reason about feedback loops, delays, and unintended consequences.",
  },
  {
    title: "The Bezos Blueprint",
    author: "Carmine Gallo",
    image: bezosBlueprint,
    description:
      "Breaks down Bezos's communication strategies — the six-page memo, narrative structure, and clarity of thought.",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    image: zeroToOne,
    description:
      "A contrarian take on startups and innovation. Short, opinionated, and full of ideas that challenge conventional thinking.",
  },
  {
    title: "Think Again",
    author: "Adam Grant",
    image: thinkAgain,
    description:
      "A compelling argument for intellectual humility. Made me more comfortable updating my beliefs when evidence changes.",
  },
  {
    title: "The Google Story",
    author: "David A. Vise",
    image: googleStory,
    description:
      "An inside look at how Google scaled from a dorm-room project to a global force. Fascinating for its engineering culture insights.",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    image: leanStartup,
    description:
      "Build-measure-learn in practice. A must-read for anyone shipping products — the validated learning loop is universally applicable.",
  },
  {
    title: "On Platforms and Ecosystems",
    author: "HBR's 10 Must Reads",
    image: platformsEcosystems,
    description:
      "A sharp collection on platform strategy and network effects. Useful for understanding the economics behind modern tech businesses.",
  },
];

export default function Bookshelf() {
  return (
    <section className="mx-auto max-w-3xl pb-16 pt-24">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Bookshelf
      </h1>

      <BookshelfGrid heroImg={heroImg} books={books} />
    </section>
  );
}
