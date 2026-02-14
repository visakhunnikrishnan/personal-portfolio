import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/the-codebase-principle/retro-terminal-version-control.png";
import img1 from "../../../../public/blog/the-codebase-principle/dev-staging-production-deployment-flow.jpg";
import { CodebaseDeploysChart } from "@/components/codebase-deploys-chart";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "The Codebase Principle",
  description:
    "Why one repository should produce every deploy, what happens when codebases drift apart, and how to keep development, staging, and production running the same code.",
  keywords: ["codebase principle", "twelve-factor app", "version control", "Git", "single repository", "deployment", "monorepo", "continuous deployment", "code drift"],
  openGraph: {
    title: "The Codebase Principle",
    description:
      "Why one repository should produce every deploy, what happens when codebases drift apart, and how to keep development, staging, and production running the same code.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Codebase Principle",
    description: "Why one repository should produce every deploy, and how to keep development, staging, and production running the same code.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          The Codebase Principle
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2025-01-29">Jan 29, 2025</time>
          <span aria-hidden="true">&middot;</span>
          <span>10 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="Version control as the foundation of the codebase principle"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Earlier, it was common for production codebases to drift far from
          development. Hotfixes were applied directly to servers. Features
          lived in branches for months. The &quot;real&quot; code existed in
          three different places, and no one could say which version was
          authoritative. Every deploy felt like a gamble. To solve this, the
          12-factor methodology introduced a deceptively simple rule: one
          codebase, tracked in version control, deployed everywhere.
        </p>

        <hr />

        <h2>The Rule: One Codebase, Many Deploys</h2>
        <p>
          The 12-factor app methodology starts with a simple rule: every
          application has exactly one codebase, tracked in version control,
          and that codebase produces every deploy. Development, staging,
          production, a teammate&apos;s local environment - they all run code
          from the same repository. The only differences between deploys are
          configuration values like database URLs, API keys, and feature
          flags. Never the code itself.
        </p>
        <p>
          This sounds obvious, but it&apos;s violated constantly. And when
          it&apos;s violated, the problems are subtle at first and painful
          later.
        </p>

        <CodebaseDeploysChart />

        <h2>What Violating This Looks Like</h2>
        <p>
          The codebase principle gets broken in several ways, and each one
          creates a different kind of pain:
        </p>

        <h3>Copy-Paste Repos</h3>
        <p>
          A team needs a second version of an application - maybe for a
          different client, or a different region. Instead of configuring the
          existing app differently, they copy the entire repository and start
          making changes. Now there are two codebases. Bug fixes in one
          don&apos;t reach the other. Features diverge. Within months, the
          two repos share 90% of their code but are maintained independently.
          Every change has to be made twice, and half the time it isn&apos;t.
        </p>

        <h3>Production Hotfixes</h3>
        <p>
          Something breaks in production at 2 AM. A developer SSH-es into the
          server and edits a file directly. The fix works. Everyone goes back
          to sleep. But the fix was never committed to the repository.
          The next deploy overwrites it. The bug returns. Or worse - the
          hotfix stays on the server, and now production is running code that
          doesn&apos;t exist anywhere in version control. No one can
          reproduce the production environment because no one knows what&apos;s
          actually running.
        </p>

        <h3>Long-Lived Branches</h3>
        <p>
          A feature branch lives for three months. During that time, the main
          branch keeps moving. The feature branch falls further behind. When
          it&apos;s finally time to merge, the conflicts are massive. The
          branch has effectively become a separate codebase - it shares an
          origin with main but has diverged so far that merging feels like
          integrating two different applications.
        </p>

        <h3>Environment-Specific Code Paths</h3>
        <p>
          Code that checks which environment it&apos;s in and behaves
          differently:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># This is a code smell — the codebase should be identical</span>
<span style="color:var(--hl-c)"># across environments. Only configuration should differ.</span>

<span style="color:var(--hl-k)">if</span> os.environ.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"ENVIRONMENT"</span>) == <span style="color:var(--hl-s)">"production"</span>:
    <span style="color:var(--hl-c)"># production-only logic</span>
    <span style="color:var(--hl-f)">send_real_email</span>(user, message)
<span style="color:var(--hl-k)">else</span>:
    <span style="color:var(--hl-c)"># staging/dev shortcut</span>
    <span style="color:var(--hl-f)">log_email_to_console</span>(user, message)` }} /></pre>

        <p>
          This looks harmless but it means the code running in staging is
          not the same code running in production. You&apos;re no longer
          testing what you deploy. The right approach is to make email
          delivery a configurable service - swap the implementation via
          configuration, not conditional logic in the code.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Better: same code path, different config</span>

<span style="color:var(--hl-c)"># mail.py</span>
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">get_mailer</span>():
    backend = os.environ.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"MAIL_BACKEND"</span>, <span style="color:var(--hl-s)">"console"</span>)
    <span style="color:var(--hl-k)">if</span> backend == <span style="color:var(--hl-s)">"smtp"</span>:
        <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">SmtpMailer</span>(os.environ[<span style="color:var(--hl-s)">"SMTP_URL"</span>])
    <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">ConsoleMailer</span>()

<span style="color:var(--hl-c)"># usage — identical in every environment</span>
mailer = <span style="color:var(--hl-f)">get_mailer</span>()
mailer.<span style="color:var(--hl-f)">send</span>(user, message)` }} /></pre>

        <p>
          Now the code path is identical everywhere. The only thing that
          changes is the <code>MAIL_BACKEND</code> environment variable. You
          test exactly what you deploy.
        </p>

        <h2>How Deploys Differ</h2>
        <p>
          If the code is the same everywhere, what makes staging different
          from production? Configuration. Each deploy is a running instance
          of the same codebase at a particular commit, combined with
          environment-specific settings.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Same codebase, same commit, different config</span>

<span style="color:var(--hl-c)"># Staging (.env.staging)</span>
<span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://dev:dev@staging-db:5432/myapp</span>
<span style="color:var(--hl-v)">MAIL_BACKEND</span>=<span style="color:var(--hl-s)">console</span>
<span style="color:var(--hl-v)">LOG_LEVEL</span>=<span style="color:var(--hl-s)">debug</span>
<span style="color:var(--hl-v)">FEATURE_NEW_CHECKOUT</span>=<span style="color:var(--hl-n)">true</span>

<span style="color:var(--hl-c)"># Production (.env.production)</span>
<span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://app:secret@prod-db:5432/myapp</span>
<span style="color:var(--hl-v)">MAIL_BACKEND</span>=<span style="color:var(--hl-s)">smtp</span>
<span style="color:var(--hl-v)">LOG_LEVEL</span>=<span style="color:var(--hl-s)">warning</span>
<span style="color:var(--hl-v)">FEATURE_NEW_CHECKOUT</span>=<span style="color:var(--hl-n)">false</span>` }} /></pre>

        <p>
          Staging might be a few commits ahead of production. A
          developer&apos;s laptop might be running a feature branch. But the
          principle holds: the code comes from one repository, and the
          differences are in configuration, not in the source.
        </p>

        <Image
          src={img1}
          alt="Development workflow showing the codebase at the center: developers push feature changes to the codebase, it deploys to staging where QA teams test, then promotes to production serving live users, with feedback and iteration flowing back to inform new development cycles"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h2>One Codebase Per App, Not Per System</h2>
        <p>
          The principle says one codebase per <em>app</em>, not one codebase
          for your entire system. If you have a web frontend, an API backend,
          and a background worker, those can be three separate codebases -
          three separate apps. Each one follows the one-codebase rule
          independently.
        </p>
        <p>
          What you should not have is one app spread across multiple
          repositories. If deploying your API requires pulling code from three
          different repos and stitching them together, that&apos;s a violation.
          The API should live in one repo.
        </p>
        <p>
          When multiple apps share common functionality, the shared code should
          be extracted into a library - a package that each app declares as a
          dependency. Copying shared code between repositories is the same trap
          as copy-paste repos: it creates divergence that gets worse over time.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Shared code becomes a package, not copied files</span>

<span style="color:var(--hl-c)"># requirements.txt for the API</span>
flask==3.0.0
<span style="color:var(--hl-v)">mycompany-shared-auth</span>==<span style="color:var(--hl-n)">1.4.2</span>   <span style="color:var(--hl-c)"># internal package</span>
<span style="color:var(--hl-v)">mycompany-shared-models</span>==<span style="color:var(--hl-n)">2.1.0</span>  <span style="color:var(--hl-c)"># internal package</span>

<span style="color:var(--hl-c)"># requirements.txt for the worker</span>
celery==5.3.0
<span style="color:var(--hl-v)">mycompany-shared-auth</span>==<span style="color:var(--hl-n)">1.4.2</span>   <span style="color:var(--hl-c)"># same package, same version</span>
<span style="color:var(--hl-v)">mycompany-shared-models</span>==<span style="color:var(--hl-n)">2.1.0</span>  <span style="color:var(--hl-c)"># same package, same version</span>` }} /></pre>

        <p>
          Both apps depend on the shared packages. When the auth logic changes,
          the package is updated once, and both apps pick up the new version
          through their dependency declarations. No copy-pasting, no drift.
        </p>

        <h2>Branching Without Diverging</h2>
        <p>
          Version control makes it easy to create branches. The danger is
          letting branches live too long. A branch that exists for a day is a
          lightweight collaboration tool. A branch that exists for three months
          is a separate codebase in disguise.
        </p>
        <p>
          Trunk-based development keeps branches short-lived. Developers
          create small feature branches, merge them into main within a day or
          two, and deploy frequently. This keeps the codebase unified and
          reduces the pain of integration.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Short-lived branches keep the codebase unified</span>

<span style="color:var(--hl-c)"># Create a branch, do the work, merge quickly</span>
<span style="color:var(--hl-f)">git</span> checkout -b feature/add-password-reset
<span style="color:var(--hl-c)"># ... make changes, commit ...</span>
<span style="color:var(--hl-f)">git</span> push origin feature/add-password-reset
<span style="color:var(--hl-c)"># open a pull request, get it reviewed, merge within 1-2 days</span>

<span style="color:var(--hl-c)"># For larger features, use feature flags instead of branches</span>
<span style="color:var(--hl-v)">FEATURE_PASSWORD_RESET</span>=<span style="color:var(--hl-n)">false</span>  <span style="color:var(--hl-c)"># deployed but hidden</span>
<span style="color:var(--hl-v)">FEATURE_PASSWORD_RESET</span>=<span style="color:var(--hl-n)">true</span>   <span style="color:var(--hl-c)"># enabled when ready</span>` }} /></pre>

        <p>
          For features too large to merge in a day, feature flags are a better
          solution than long-lived branches. The code is merged into main and
          deployed, but the feature is hidden behind a flag until it&apos;s
          ready. The codebase stays unified. No divergence.
        </p>

        <h2>The Confidence Test</h2>
        <p>
          Here is a quick way to check if your team follows the codebase
          principle:
        </p>
        <blockquote>
          <p>
            Can any developer clone the repository, set the right environment
            variables, and have a working application - identical to what
            runs in production?
          </p>
        </blockquote>
        <p>
          If the answer is yes, the codebase principle is working. If the
          answer involves &quot;you also need to grab these files from the
          staging server&quot; or &quot;production has a few patches that
          aren&apos;t in the repo&quot; or &quot;check the wiki for the
          special build steps&quot; - those are signs of drift.
        </p>

        <h2>Key Takeaway</h2>
        <p>
          One codebase, tracked in version control, deployed everywhere. This
          is the starting point for everything else in the 12-factor
          methodology. If your staging environment runs different code than
          production, you can&apos;t trust your tests. If hotfixes bypass the
          repository, you can&apos;t reproduce bugs. If feature branches live
          for months, you don&apos;t have one codebase - you have several.
          The principle is deceptively simple: all deploys come from the same
          source. The differences between environments are configuration, not
          code. When this holds, deploying becomes predictable. When it
          doesn&apos;t, every deploy is a surprise.
        </p>
      </div>

      <RelatedPosts slug="the-codebase-principle" />
    </article>
  );
}
