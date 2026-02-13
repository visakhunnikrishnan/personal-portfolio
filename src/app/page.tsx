import Image from "next/image";

export default function Home() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-12 pt-14 md:flex-row md:gap-16">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi,
          </h1>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            I&rsquo;m Visakh Unni
          </h1>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground">
          I&rsquo;m a Research engineer who enjoys hidden pattern mining,
          parallel computing and data storytelling with visualizations. Nowadays,
          exploring the synergies between internal developer platforms and
          DevOps, enhancing both the development process and operational
          workflows.
        </p>

        <p className="text-lg leading-relaxed text-muted-foreground">
          Welcome to my corner of the internet.
          <br />
          I&rsquo;m glad you&rsquo;re here!
        </p>
      </div>

      <div className="flex shrink-0 justify-center">
        <Image
          src="/visakh-unni.avif"
          alt="Visakh Unni"
          width={280}
          height={280}
          priority
          className="rounded-2xl object-cover shadow-md"
        />
      </div>
    </section>
  );
}
