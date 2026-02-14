import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/the-rise-of-self-service-platforms-and-backstage-framework/developers-working-in-open-office.png";
import img0 from "../../../../public/blog/the-rise-of-self-service-platforms-and-backstage-framework/team-topologies-book-cover.jpg";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "Building Self-Service Platforms That Developers Actually Use",
  description:
    "Why platform engineering matters, how self-service portals and CLIs reduce developer cognitive load, and the practical lessons from building internal developer platforms.",
  keywords: ["platform engineering", "self-service platform", "internal developer platform", "Backstage", "developer experience", "cognitive load", "developer portal", "DevOps", "infrastructure automation"],
  openGraph: {
    title: "Building Self-Service Platforms That Developers Actually Use",
    description:
      "Why platform engineering matters, how self-service portals and CLIs reduce developer cognitive load, and the practical lessons from building internal developer platforms.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Self-Service Platforms That Developers Actually Use",
    description: "Why platform engineering matters, how self-service portals and CLIs reduce developer cognitive load, and practical lessons from building IDPs.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Building Self-Service Platforms That Developers Actually Use
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2025-01-29">Jan 29, 2025</time>
          <span aria-hidden="true">&middot;</span>
          <span>16 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="Building Self-Service Platforms That Developers Actually Use"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          For years I watched the same thing happen at every organisation I
          worked with. A developer needs a new database, a Kubernetes
          cluster, or CI/CD runners. They file a ticket with
          the ops team. The ops team is swamped - they&apos;re serving dozens
          of application teams with a handful of people. The ticket sits in a
          queue. Days pass. Sometimes weeks. The developer, blocked and
          frustrated, either finds a workaround (often a bad one) or just
          waits. Multiply this across every team, and you have an organisation
          where a huge chunk of engineering time is spent waiting for
          infrastructure.
        </p>
        <p className="italic text-muted-foreground">
          Self-service platforms exist to break this cycle. Instead of filing
          tickets and waiting, developers get access to a portal or CLI where
          they can provision what they need themselves - within guardrails set
          by the platform team. This post is about why this shift matters, what
          I&apos;ve learned from building these platforms, and the practical
          lessons that are easy to miss.
        </p>

        <hr />

        <h2>The Problem: Ops as a Bottleneck</h2>
        <p>
          The traditional setup looks like this: you have application teams
          who build features and a centralised operations team who manages
          infrastructure. Developers focus on business logic, ops handles
          everything underneath. In theory, this separation makes sense -
          each group does what they&apos;re good at.
        </p>
        <p>
          In practice, it creates a bottleneck. Every time a developer needs
          something from ops - a new environment, a secret rotated, a firewall
          rule changed - they raise a ticket. The ops team prioritises tickets
          based on urgency, which means lower-priority requests pile up. A
          developer who needs a staging environment might wait three days for
          something that takes ops fifteen minutes to do. The actual work is
          fast. The waiting is what kills productivity.
        </p>
        <p>
          Some organisations try to solve this by hiring more ops people. But
          it doesn&apos;t scale. As the number of application teams grows,
          the ticket queue grows faster than you can hire. You end up in an
          arms race between demand and capacity that the ops team will always
          lose.
        </p>
        <p>
          The real fix isn&apos;t more ops engineers - it&apos;s removing the
          need for most of those tickets in the first place. That&apos;s what
          self-service platforms do. They take the most common requests -
          provisioning infrastructure, spinning up environments, setting up
          pipelines - and turn them into automated workflows that developers
          can trigger themselves.
        </p>

        <hr />

        <h2>The Team Topologies Framework</h2>
        <p>
          To understand why self-service platforms work, it helps to
          understand the organisational model that makes them necessary.
          Matthew Skelton and Manuel Pais lay this out clearly in{" "}
          <strong>Team Topologies</strong>, and it&apos;s a good read if you&apos;re thinking about how to
          structure engineering teams.
        </p>

        <Image
          src={img0}
          alt="Team Topologies: Organizing Business and Technology Teams for Fast Flow by Matthew Skelton and Manuel Pais"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          Their starting point is Conway&apos;s Law: the idea that the
          software you build will mirror the communication structure of your
          organisation. If your teams are siloed, your architecture will be
          siloed. If your teams collaborate across boundaries, your systems
          will integrate across boundaries. This isn&apos;t a suggestion -
          it&apos;s an observation about how organisations actually work. The
          insight from Team Topologies is that you can use this deliberately.
          Instead of letting your org chart accidentally shape your
          architecture, you design your team structure to produce the
          architecture you want. They call this the{" "}
          <strong>inverse Conway maneuver</strong>.
        </p>

        <h3>Four Team Types</h3>
        <p>
          Skelton and Pais argue that you only need four types of teams to
          build and run modern software:
        </p>
        <ul>
          <li>
            <strong>Stream-aligned teams</strong> are the primary unit. Each
            one is responsible for a single stream of work - a product, a
            service, a user journey. They&apos;re full-stack and
            full-lifecycle: they build it, test it, deploy it, run it. The
            goal is for these teams to move fast and independently, without
            waiting on anyone else.
          </li>
          <li>
            <strong>Platform teams</strong> exist to serve stream-aligned
            teams. They build and maintain internal services - infrastructure,
            tooling, shared capabilities - that stream-aligned teams consume
            as self-service. The platform team&apos;s job is to make the
            stream-aligned team&apos;s job easier.
          </li>
          <li>
            <strong>Enabling teams</strong> are temporary coaching teams.
            They help stream-aligned teams learn new skills or adopt new
            tools, then step back once the team is self-sufficient. They
            don&apos;t write standards and enforce them - they educate and
            build capability.
          </li>
          <li>
            <strong>Complicated-subsystem teams</strong> own areas that
            require deep specialist knowledge - things like machine learning
            models, payment processing engines, or video encoding systems.
            These would overload a stream-aligned team if embedded directly.
          </li>
        </ul>
        <p>
          The key insight is how these teams interact. The book defines three
          interaction modes: <strong>collaboration</strong> (working closely
          together, usually temporarily during discovery or integration),{" "}
          <strong>X-as-a-Service</strong> (one team provides a service, the
          other consumes it with minimal coordination), and{" "}
          <strong>facilitating</strong> (the enabling team coaches another
          team without doing the work for them).
        </p>
        <p>
          For platform teams, the target interaction mode is X-as-a-Service.
          Stream-aligned teams should be able to use the platform without
          needing to collaborate with the platform team for every request. If
          a developer has to file a ticket or jump on a call with the platform
          team every time they need something, the platform isn&apos;t
          working - it&apos;s just a different flavour of the same bottleneck.
        </p>

        <h3>Cognitive Load: The Real Metric</h3>
        <p>
          The deeper reason this structure works comes down to cognitive load
          - the total mental effort a developer has to spend to do their job.
          Cognitive load has three types.{" "}
          <strong>Intrinsic load</strong> is the complexity of the work
          itself - understanding the language, the domain, the algorithms.
          This is unavoidable, and it&apos;s what you <em>want</em>{" "}
          developers thinking about. <strong>Germane load</strong> is the
          effort spent on business-specific problems - designing the right
          solution, making trade-off decisions. This is valuable thinking.{" "}
          <strong>Extraneous load</strong> is everything else - figuring out
          how to deploy, navigating inconsistent tooling, hunting for
          documentation, understanding infrastructure quirks. This is waste.
        </p>
        <p>
          The purpose of a platform team is to absorb extraneous cognitive
          load from stream-aligned teams. When a developer doesn&apos;t have
          to think about Kubernetes manifests, Terraform configurations, or
          CI/CD pipeline syntax - when they can just say &quot;give me a
          production-ready service&quot; and get one - their mental energy
          goes to the work that actually matters.
        </p>
        <p>
          Spotify measured this directly. Before building their internal
          developer platform, it took a new engineer over 60 days to merge
          their 10th pull request. After the platform was in place, that
          dropped to 20 days - a 67% reduction. The engineers weren&apos;t
          suddenly smarter or faster. They were just spending less time
          fighting infrastructure and more time writing code.
        </p>

        <blockquote>
          <p>
            As a developer, you&apos;re not waiting so much and you can be
            autonomous. You can help the business as much as possible because
            you&apos;re not waiting to add value.
          </p>
          <footer className="text-sm text-muted-foreground">
            - Alan Barr, Product Owner - IDP, Veterans United Home Loans
          </footer>
        </blockquote>

        <h3>The Role of Enabling Teams</h3>
        <p>
          One thing that often gets overlooked in platform engineering
          conversations is the role of enabling teams. You can build the best
          platform in the world, but if stream-aligned teams don&apos;t know
          how to use it - or don&apos;t see why they should - adoption will
          stall. Enabling teams bridge that gap. They work alongside
          stream-aligned teams temporarily, helping them adopt the platform,
          understand the golden paths, and build confidence with the new
          tooling. Once the team is self-sufficient, the enabling team moves
          on to the next group. Without this, you&apos;re relying on
          documentation and hope - and documentation alone rarely drives
          adoption.
        </p>

        <hr />

        <h2>The Thinnest Viable Platform</h2>
        <p>
          Here&apos;s where a lot of teams go wrong. They decide to build an
          internal developer platform, and immediately start designing a
          massive portal with dozens of features, plugin systems, and a
          custom UI framework. Six months later, they have a half-built
          platform that nobody uses because it doesn&apos;t solve the
          problems developers actually have.
        </p>
        <p>
          Skelton and Pais have a concept called the{" "}
          <strong>Thinnest Viable Platform (TVP)</strong> - the smallest set
          of APIs, tools, and documentation needed to accelerate development.
          The key word is &quot;thinnest.&quot; A TVP could be a CLI that
          automates three common workflows. It could be a wiki page listing
          approved services and how to use them. It could be a set of
          Terraform modules that teams can reference. The point is: don&apos;t
          build anything thicker than necessary.
        </p>
        <p>
          This is different from a minimum viable product. An MVP is about
          the initial phase - ship something small, see if it works. A TVP is
          about the <em>lifetime</em> of the platform - maintain the thinnest
          version that delivers value, and only add thickness when there&apos;s
          a clear need. It&apos;s a mindset of restraint that prevents the
          platform from becoming the kind of bloated, hard-to-maintain system
          it was supposed to replace.
        </p>
        <p>
          Trade Me, New Zealand&apos;s largest marketplace, applied this
          approach with around 200 engineers. Their small squads of 4-5
          people were struggling with the cognitive load of managing cloud
          infrastructure alongside feature work. Instead of building a massive
          portal, they started with sensible defaults, golden paths for common
          tasks, and production-readiness guardrails. Time to deploy a new
          service went from three weeks to one day.
        </p>

        <hr />

        <h2>What Actually Worked: Portal + CLI</h2>
        <p>
          In my experience, the combination that works best is a self-service
          portal for visibility and discovery, paired with a CLI for actual
          execution. Each solves a different problem, and together they cover
          most of what developers need.
        </p>

        <h3>The Portal: Where You Find Things</h3>
        <p>
          The portal is your single pane of glass. It&apos;s where developers
          go to find out what services exist, who owns them, where the
          documentation lives, what the health status is, and how things
          connect. In a microservices architecture with hundreds of services,
          this kind of discoverability is essential. Without it, a new joiner
          spends their first weeks just figuring out what exists and who to
          ask about it.
        </p>
        <p>
          The portal is also where you surface golden paths - the recommended
          way to do common things. Need to create a new service? Here&apos;s
          the template. Need to set up monitoring? Here&apos;s the standard
          configuration. Golden paths aren&apos;t mandates - they&apos;re
          suggestions backed by best practices. Paula Kennedy from Syntasso
          describes them as &quot;proven, empathic patterns&quot; that show
          teams what good looks like across compliance, governance, and
          technical domains. Handle the 80% common case beautifully, and
          provide escape hatches for the remaining 20%.
        </p>

        <h3>The CLI: Where You Do Things</h3>
        <p>
          The CLI is where the actual self-service happens. Developers
          don&apos;t want to click through a web UI to provision a database -
          they want to type a command and have it done. A well-designed CLI
          lets them scaffold a new project from a template, provision
          infrastructure, deploy to any environment, rotate secrets, and check
          the status of their services - all from their terminal.
        </p>
        <p>
          There&apos;s an important lesson here: a clunky CLI that automates
          a three-hour manual process is infinitely more valuable than a
          beautiful portal that doesn&apos;t actually automate anything. I
          have seen teams spend months building a polished web interface that
          was essentially a directory of links - no actual self-service
          capability underneath. Start with the automation, then add the UI.
          Not the other way around.
        </p>

        <h3>Why Both?</h3>
        <p>
          Different people use the platform differently. A developer
          spinning up their fifth service this month wants the CLI - it&apos;s
          fast, scriptable, and fits their workflow. A project manager trying
          to understand the health of the system wants the portal - visual,
          browsable, no terminal required. A new joiner trying to understand
          the architecture needs the portal&apos;s catalogue. A senior
          engineer automating a deployment pipeline needs the CLI&apos;s
          programmatic interface. Building both serves the full range of
          users.
        </p>
        <p>
          There&apos;s another benefit to this approach: it provides a useful
          abstraction layer over your code quality tools, security posture
          management, compliance checks, and other operational tooling. The
          most common use cases - running a security scan, checking code
          coverage, viewing compliance status - are surfaced through the
          portal and CLI where anyone can access them. But you&apos;re not restricting
          power users from accessing the underlying tools directly when they
          need to. The portal simplifies the 80% case without locking down
          the remaining 20%.
        </p>

        <hr />

        <h2>Treat It Like a Product</h2>
        <p>
          This is the single most important lesson I&apos;ve seen in
          platform engineering, and the one that&apos;s most often ignored:
          the platform is a product, and your developers are its users.
        </p>
        <p>
          That means everything you know about building good products
          applies. You need to understand your users - what are their actual
          pain points, not what you <em>think</em> their pain points are? You
          need to prioritise features based on impact, not on what&apos;s
          technically interesting. You need a feedback loop - regular surveys,
          interviews, usage analytics - so you know what&apos;s working and
          what&apos;s not. And you need someone who owns the product vision.
          The most successful platform teams have a dedicated product
          manager - about 25% of organisations do this now, and it makes a
          measurable difference.
        </p>
        <p>
          Wise (the fintech company) took this seriously when building their
          developer platform. They ran biannual surveys that revealed specific
          pain points: developers couldn&apos;t find documentation, service
          ownership was unclear, and navigating the codebase across
          microservices carried a heavy cognitive load. They followed up with
          user interviews - a three-person team with a main interviewer, a
          journey mapper, and a note-taker. The result was detailed user
          personas and journey maps that guided what they actually built,
          instead of guessing.
        </p>

        <blockquote>
          <p>
            The feeling of being heard and understood is very important.
          </p>
          <footer className="text-sm text-muted-foreground">
            - Zohar Einy
          </footer>
        </blockquote>

        <p>
          One thing Wise learned that&apos;s worth highlighting: they used
          wireframes before building anything. Instead of spending weeks
          coding a feature and hoping developers would like it, they mocked
          it up, showed it to users, and iterated on the design before
          writing a line of code. This prevented solution bias - building
          what the team <em>wanted</em> to build rather than what users
          <em>needed</em>.
        </p>

        <hr />

        <h2>Anti-Patterns to Avoid</h2>
        <p>
          Having seen several platform engineering efforts succeed and fail,
          there are common traps that are worth calling out.
        </p>

        <h3>Building the Portal First</h3>
        <p>
          The most common mistake. Teams spend months building a beautiful
          developer portal - service catalogue, documentation viewer,
          dashboards - without automating anything underneath. The portal
          becomes a fancy directory. Developers visit it once, see that it
          doesn&apos;t actually <em>do</em> anything, and go back to filing
          tickets. Always start with the backend automation. The portal is
          the interface to the automation, not a replacement for it.
        </p>

        <h3>Mandating Adoption</h3>
        <p>
          Telling developers &quot;you must use the platform&quot; kills the
          feedback loop that makes the platform good. If adoption is
          mandatory, you&apos;ll never know whether people are using it
          because it&apos;s useful or because they have no choice. The
          platform should earn its users by being the easiest, fastest, safest
          way to ship code. If it&apos;s not, that&apos;s feedback you need
          to hear.
        </p>

        <h3>The Field of Dreams Fallacy</h3>
        <p>
          &quot;Build it and they will come&quot; does not work for internal
          platforms. I have seen teams develop a platform in isolation for
          months, launch it with a big announcement, and get minimal
          adoption - because it solved technical problems the platform team
          cared about, not the pain points developers actually had. Start
          with one or two teams, solve their real problems, demonstrate value,
          and let word spread organically.
        </p>

        <h3>Overengineering on Day One</h3>
        <p>
          Multi-cloud abstractions, custom service meshes, a plugin system
          for everything - all before you have 10 users. Solve today&apos;s
          problems. A simple script that automates environment provisioning
          is worth more than an architecturally perfect platform that&apos;s
          still six months from being usable.
        </p>

        <h3>Rebranding Operations</h3>
        <p>
          Renaming the ops team to &quot;platform team&quot; without changing
          how they work is not platform engineering. If the &quot;platform
          team&quot; is still processing tickets and manually provisioning
          infrastructure, you&apos;ve changed the name but not the problem.
          Platform engineering requires building products that eliminate the
          need for those tickets - not just processing them faster.
        </p>

        <h3>Not Building Relationships First</h3>
        <p>
          Developers are one of the hardest users to sell to. They&apos;re
          sceptical of new tools, they&apos;ve been burned by internal
          platforms before, and they can tell immediately if something
          was built without understanding their workflow. You can&apos;t just
          ship a platform and expect adoption. You need to build
          relationships with stakeholders across different teams - sit with
          them, understand their pain points firsthand, earn their trust
          before asking them to change how they work. The platform teams that
          succeed are the ones that have champions inside the stream-aligned
          teams - developers who tried the platform early, found it useful,
          and advocate for it to their peers. That kind of trust isn&apos;t
          built through documentation or launch emails. It&apos;s built
          through relationships.
        </p>

        <h3>Ignoring the Platform Team&apos;s Own Cognitive Load</h3>
        <p>
          There&apos;s an irony that doesn&apos;t get talked about enough.
          Platform engineering reduces cognitive load on developers, but it
          can transfer that burden to the platform team - a group that&apos;s
          typically smaller and less invested in. Managing dozens of tools,
          keeping up with new releases, handling compliance and governance,
          while also building new features for developers - it&apos;s a lot.
          If the platform team burns out, the platform stagnates, and the
          whole initiative fails. Budget for it. Staff for it. Treat the
          platform team&apos;s experience as seriously as the developer
          experience.
        </p>

        <hr />

        <h2>Measuring Success</h2>
        <p>
          You need to know whether the platform is actually working, and the
          right metrics aren&apos;t always obvious.
        </p>
        <p>
          <strong>Don&apos;t measure:</strong> portal logins, number of
          plugins, API call volume. These are vanity metrics that tell you
          activity is happening but not whether value is being delivered.
        </p>
        <p>
          <strong>Do measure:</strong>
        </p>
        <ul>
          <li>
            <strong>Time to first deployment</strong> for new joiners. How
            long from day one until a new developer ships their first change
            to production? This captures onboarding friction, documentation
            quality, and platform usability in a single number.
          </li>
          <li>
            <strong>Ticket volume from dev teams to ops.</strong> If the
            platform is working, this should drop. Measure the reduction, not
            the resolution time.
          </li>
          <li>
            <strong>Time to provision common resources.</strong> How long
            does it take to spin up a new service, database, or environment?
            Compare before and after the platform.
          </li>
          <li>
            <strong>Developer satisfaction surveys.</strong> Ask developers
            directly: does the platform help you? What&apos;s still painful?
            Some organisations track an internal NPS (Net Promoter Score)
            for their platform.
          </li>
          <li>
            <strong>Deployment frequency.</strong> Are teams shipping more
            often? This is a signal that the platform is reducing friction in
            the delivery pipeline.
          </li>
        </ul>
        <h3>Platform Team OKRs</h3>
        <p>
          The platform team should have its own OKRs, just like any product
          team. These shouldn&apos;t be about how many features the platform
          ships - they should be tied to developer outcomes. An objective
          like &quot;Reduce friction in the development lifecycle&quot; with
          key results like &quot;Cut average environment provisioning time
          from 3 days to under 1 hour&quot; or &quot;Reduce ops ticket volume
          from dev teams by 40%&quot; keeps the team focused on impact, not
          activity. When the platform team&apos;s success is measured by how
          much easier they make life for stream-aligned teams, the right
          priorities follow naturally.
        </p>

        <h3>Supporting DORA Metrics</h3>
        <p>
          A well-built platform directly supports the four DORA metrics that
          measure software delivery performance:{" "}
          <strong>deployment frequency</strong> (how often you ship),{" "}
          <strong>lead time for changes</strong> (how long from commit to
          production), <strong>change failure rate</strong> (how often
          deployments cause incidents), and{" "}
          <strong>mean time to recovery</strong> (how fast you bounce back
          from failures). Self-service provisioning and golden path templates
          improve lead time. Automated guardrails and standardised pipelines
          reduce change failure rate. Built-in observability and rollback
          capabilities cut recovery time. The platform doesn&apos;t just make
          developers faster - it makes the entire delivery pipeline more
          reliable. Tracking DORA metrics before and after platform adoption
          is one of the clearest ways to demonstrate its value to leadership.
        </p>

        <p>
          Zepto, an Indian delivery company, tracked onboarding time for new
          microservices. Before their platform: two days of manual CI/CD
          configuration, frequent misconfigurations, and dependency on the
          ops team. After: ten minutes, fully automated, zero ops involvement.
          That&apos;s the kind of before-and-after measurement that makes the
          value undeniable.
        </p>

        <hr />

        <h2>Key Takeaway</h2>
        <p>
          The shift to self-service platforms isn&apos;t about adopting a
          specific framework or building a flashy portal. It&apos;s about
          recognising that the traditional ops model - where developers
          wait for a small team to process their requests - doesn&apos;t
          scale, and building something better.
        </p>
        <p>
          Start thin. Automate the one or two workflows that generate the
          most tickets. Build a CLI that developers can use from their
          terminal. Add a portal when you need discoverability and visibility.
          Treat the platform like a product - talk to your users, measure
          what matters, and iterate based on feedback, not assumptions.
        </p>
        <p>
          And resist the urge to build everything at once. The thinnest
          viable platform that solves real problems today is worth infinitely
          more than the perfect platform that&apos;s still being designed six
          months from now. Ship something small, prove it works, and grow
          from there.
        </p>

        <div className="my-8 rounded-lg border border-border bg-muted/50 p-6">
          <p className="mb-0">
            <strong>A note:</strong> I can see we are fundamentally changing
            the way we build and use software with the rise of agentic tools.
            Taking inspiration from Claude Code and the concepts built around
            it, I&apos;m currently experimenting on building better interfaces
            for developers. Will update this blog based on the outcomes of
            that.
          </p>
        </div>
      </div>

      <RelatedPosts slug="the-rise-of-self-service-platforms-and-backstage-framework" />
    </article>
  );
}
