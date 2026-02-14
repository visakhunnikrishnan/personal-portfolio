import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Visakh Unni",
  description:
    "Get in touch with Visakh Unni. Whether you have a question, a collaboration idea, or just want to share your thoughts.",
};

export default function Contact() {
  return (
    <section className="mx-auto max-w-3xl pb-16 pt-32">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Get in Touch
        </h1>
        <div className="mb-10 max-w-md space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            Whether it&rsquo;s about a potential collaboration, something
            I&rsquo;ve written, or an idea worth discussing - I&rsquo;m
            happy to hear from you.
          </p>
          <p>The best conversations often start with a simple email.</p>
        </div>
        <a
          href="mailto:contact@visakhunni.com"
          className="text-lg font-medium underline underline-offset-4 transition-colors hover:text-muted-foreground"
        >
          contact@visakhunni.com
        </a>
      </div>
    </section>
  );
}
