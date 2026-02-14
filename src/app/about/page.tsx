import type { Metadata } from "next";
import Image from "next/image";
import { PhotoGallery } from "./photo-gallery";

import heroImg from "../../../public/about/hero.png";
import wovenLampCeiling from "../../../public/about/woven-lamp-ceiling.jpg";
import baliVolcanoLandscape from "../../../public/about/bali-volcano-landscape.jpg";
import nusaPenidaCliffOcean from "../../../public/about/nusa-penida-cliff-ocean.jpg";
import nilgiriTahrMunnar from "../../../public/about/nilgiri-tahr-munnar.jpg";
import munnarTeaPlantations from "../../../public/about/munnar-tea-plantations.jpg";
import watchtowerContrailSky from "../../../public/about/watchtower-contrail-sky.jpg";
import airplaneWingSunset from "../../../public/about/airplane-wing-sunset.jpg";
import streetArtFestiveLights from "../../../public/about/street-art-festive-lights.jpg";
import stormCloudsLightning from "../../../public/about/storm-clouds-lightning.jpg";

export const metadata: Metadata = {
  title: "About - Visakh Unni",
  description:
    "Visakh Unni's journey from a computer science graduate to a senior research engineer, detailing his contributions in data science, engineering, and developer platforms.",
};

export default function About() {
  return (
    <section className="mx-auto max-w-3xl pb-16 pt-24">
      {/* Hero */}
      <Image
        src={heroImg}
        alt="About Visakh Unni"
        className="mb-12 w-full rounded-lg"
        priority
        placeholder="blur"
      />

      {/* Who am I */}
      <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert prose-p:leading-relaxed">
        <h1>Who am I?</h1>

        <p>
          I&rsquo;m Visakh Unni, a senior research engineer working across data
          science, data engineering, and internal developer platforms. Much of
          what I know I owe to the remarkable people I&rsquo;ve had the chance
          to work with along the way.
        </p>

        <p>
          I started out at a few startups in the digital marketing space right
          after graduating in Computer Science and Engineering. Together with a
          small team, we built an automation platform for mass notification
          delivery that crossed 2 billion notifications in its first year.
          Working on customer analytics there is what pulled me into the world
          of data science.
        </p>

        <p>
          At EY, a colleague and I built the first data science team in the GDS
          unit from scratch, growing it over a few years. We
          tackled problems across auditing, F&amp;B, energy &amp; utilities, and
          the automotive sector - each domain teaching me to think about
          data differently.
        </p>

        <p>
          Vimana (System Insights), a manufacturing analytics company, turned
          out to be a turning point. The mentorship I received there
          fundamentally changed how I approach software - from writing
          clean, testable code to designing data pipelines that could handle
          over 20 billion events on their busiest days.
        </p>

        <p>
          When Vimana was acquired by HBK (Spectris), I stayed on as a senior
          research engineer, working on sensor data analysis across a wide range
          of products. Today, I&rsquo;m part of a platform team building
          internal developer tools - helping teams ship better software
          through shared tooling and engineering best practices.
        </p>

        <h2>About the blogs</h2>

        <p>
          I write about things I&rsquo;m actively learning or have spent time
          thinking through. Most of these ideas trace back to problems
          I&rsquo;ve encountered at work or books that shifted my perspective. Welcome to my corner of the
          internet, and thank you for reading.
        </p>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery images={[wovenLampCeiling, baliVolcanoLandscape, nusaPenidaCliffOcean, nilgiriTahrMunnar, munnarTeaPlantations, watchtowerContrailSky, airplaneWingSunset, streetArtFestiveLights, stormCloudsLightning]} />

      {/* Contact */}
      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">Get in touch</p>
        <a
          href="mailto:contact@visakhunni.com"
          className="text-lg font-medium underline underline-offset-4 hover:text-muted-foreground"
        >
          contact@visakhunni.com
        </a>
        <div className="flex gap-5 pt-2">
          <a
            href="https://github.com/visakhunnikrishnan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/visakh-unni/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="https://medium.com/@visakhunni36"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </a>
          <a
            href="https://x.com/visakh_unni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="X (Twitter)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
