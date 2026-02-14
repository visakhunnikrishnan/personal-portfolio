import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/on-dependency-management/chain-links-closeup.png";
import img0 from "../../../../public/blog/on-dependency-management/declare-isolate-dependencies-diagram.jpg";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "On Dependency Management",
  description:
    "Why every dependency should be explicitly declared and isolated, what breaks when applications rely on globally installed packages, and how virtual environments, lock files, and containers solve this.",
  keywords: ["dependency management", "twelve-factor app", "pip", "requirements.txt", "virtual environments", "lock files", "Docker", "pip-tools", "Python dependencies", "package management"],
  openGraph: {
    title: "On Dependency Management",
    description:
      "Why every dependency should be explicitly declared and isolated, what breaks when applications rely on globally installed packages, and how virtual environments, lock files, and containers solve this.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "On Dependency Management",
    description: "Why every dependency should be explicitly declared and isolated, and how virtual environments, lock files, and containers solve this.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          On Dependency Management
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
        alt="Chain links representing the interconnected dependencies that hold a software project together"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          When applications depend on libraries that are installed globally
          on a machine, things work until they do not. Two projects need
          different versions of the same library. A deployment fails because
          someone updated a system package. A new developer clones the
          repository and nothing runs because half the dependencies were
          never documented. The 12-factor methodology captures the fix in
          two rules: explicitly declare all dependencies, and isolate them
          so nothing leaks in from the surrounding system.
        </p>

        <hr />

        <h2>The Two Rules</h2>
        <p>
          The 12-factor dependency principle has two parts:
        </p>
        <ol>
          <li>
            <strong>Declaration.</strong> Every dependency your application
            needs must be listed in a manifest file. Nothing is assumed to
            be pre-installed.
          </li>
          <li>
            <strong>Isolation.</strong> The application must not rely on
            system-wide packages. Dependencies are installed into an
            isolated environment so only what is declared is available.
          </li>
        </ol>
        <p>
          Declaration tells you <em>what</em> the application needs.
          Isolation ensures that <em>only</em> what is declared is present.
          Together, they make the application portable and reproducible.
        </p>

        <h2>What Breaks Without Explicit Dependencies</h2>
        <p>
          When dependencies are not declared explicitly, problems show up in
          predictable ways:
        </p>

        <h3>The &quot;Works on My Machine&quot; Problem</h3>
        <p>
          A developer installs a library globally to try it out. It works.
          They commit the code but forget to add the library to the
          requirements file. On their machine, everything passes. In CI or
          on a colleague&apos;s machine, the import fails:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># This fails on any machine that doesn't have requests installed globally</span>
<span style="color:var(--hl-k)">import</span> requests

response = requests.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"https://api.example.com/data"</span>)

<span style="color:var(--hl-c)"># ModuleNotFoundError: No module named 'requests'</span>` }} /></pre>

        <p>
          The fix is obvious once you know the library is missing, but the
          failure might not be this clear. It could surface as an obscure
          error deep in a call stack, and debugging it wastes time that
          proper declaration would have prevented.
        </p>

        <h3>Version Conflicts Between Projects</h3>
        <p>
          Project A needs <code>SQLAlchemy 1.4</code>. Project B needs{" "}
          <code>SQLAlchemy 2.0</code>. If both install into the global
          Python environment, only one version can exist at a time.
          Installing dependencies for Project B breaks Project A. This is
          a direct consequence of not isolating dependencies per project.
        </p>

        <h3>Implicit System Dependencies</h3>
        <p>
          The application calls <code>curl</code> from a subprocess, or
          depends on <code>libpq</code> for PostgreSQL connections, or
          uses <code>ImageMagick</code> to resize images. These are not
          Python packages - they are system-level tools. If they are not
          documented, the application works on the developer&apos;s machine
          (where they happen to be installed) and fails everywhere else.
        </p>

        <h2>Declaring Dependencies</h2>
        <p>
          In Python, the standard way to declare dependencies is a
          requirements file. Every library the application imports should
          be listed with a pinned version:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># requirements.txt</span>
<span style="color:var(--hl-v)">flask</span>==<span style="color:var(--hl-n)">3.0.0</span>
<span style="color:var(--hl-v)">sqlalchemy</span>==<span style="color:var(--hl-n)">2.0.23</span>
<span style="color:var(--hl-v)">redis</span>==<span style="color:var(--hl-n)">5.0.1</span>
<span style="color:var(--hl-v)">celery</span>==<span style="color:var(--hl-n)">5.3.6</span>
<span style="color:var(--hl-v)">gunicorn</span>==<span style="color:var(--hl-n)">21.2.0</span>` }} /></pre>

        <p>
          Pinning versions matters. Without pinned versions, running{" "}
          <code>pip install -r requirements.txt</code> today and
          tomorrow could produce different results if a library releases a
          new version in between. A deploy that worked yesterday breaks
          today, and nothing in your code changed. Pinned versions make
          builds reproducible.
        </p>

        <Image
          src={img0}
          alt="Two-panel diagram showing declaring dependencies on the left (codebase pointing to a config file like requirements.txt that explicitly lists every external package) and isolating dependencies on the right (separate virtual environments for a Python backend service and a Node.js frontend project, each with their own dependency manager like Bundler, Yarn, or npm)"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h2>Lock Files: Pinning the Entire Dependency Tree</h2>
        <p>
          Pinning your direct dependencies is a good start, but your
          dependencies have dependencies of their own. <code>Flask 3.0.0</code>{" "}
          depends on <code>Werkzeug</code>, <code>Jinja2</code>,{" "}
          <code>Click</code>, and others. If you do not pin those transitive
          dependencies, they can change between installs.
        </p>
        <p>
          A lock file captures the exact version of every package in the
          entire dependency tree - direct and transitive:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Generate a lock file from your current environment</span>
<span style="color:var(--hl-f)">pip</span> freeze > requirements-lock.txt

<span style="color:var(--hl-c)"># requirements-lock.txt (every package, exact versions)</span>
<span style="color:var(--hl-v)">blinker</span>==<span style="color:var(--hl-n)">1.7.0</span>
<span style="color:var(--hl-v)">celery</span>==<span style="color:var(--hl-n)">5.3.6</span>
<span style="color:var(--hl-v)">click</span>==<span style="color:var(--hl-n)">8.1.7</span>
<span style="color:var(--hl-v)">flask</span>==<span style="color:var(--hl-n)">3.0.0</span>
<span style="color:var(--hl-v)">itsdangerous</span>==<span style="color:var(--hl-n)">2.1.2</span>
<span style="color:var(--hl-v)">jinja2</span>==<span style="color:var(--hl-n)">3.1.2</span>
<span style="color:var(--hl-v)">markupsafe</span>==<span style="color:var(--hl-n)">2.1.3</span>
<span style="color:var(--hl-v)">redis</span>==<span style="color:var(--hl-n)">5.0.1</span>
<span style="color:var(--hl-v)">sqlalchemy</span>==<span style="color:var(--hl-n)">2.0.23</span>
<span style="color:var(--hl-v)">werkzeug</span>==<span style="color:var(--hl-n)">3.0.1</span>
<span style="color:var(--hl-c)"># ... every transitive dependency listed</span>` }} /></pre>

        <p>
          Now every install produces the exact same environment. The lock
          file is committed to the repository. When you deploy, you install
          from the lock file, not from the loose requirements. This is what
          makes builds truly reproducible.
        </p>
        <p>
          Tools like <code>pip-tools</code> or <code>Poetry</code> automate
          this. You declare your direct dependencies in one file, and the
          tool generates a lock file with the full resolved tree:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># With pip-tools</span>

<span style="color:var(--hl-c)"># requirements.in - what you declare (direct dependencies)</span>
<span style="color:var(--hl-v)">flask</span>==<span style="color:var(--hl-n)">3.0.0</span>
<span style="color:var(--hl-v)">sqlalchemy</span>==<span style="color:var(--hl-n)">2.0.23</span>
<span style="color:var(--hl-v)">redis</span>==<span style="color:var(--hl-n)">5.0.1</span>

<span style="color:var(--hl-c)"># Compile the lock file</span>
<span style="color:var(--hl-f)">pip-compile</span> requirements.in -o requirements.txt

<span style="color:var(--hl-c)"># Install from the lock file (exact versions, every time)</span>
<span style="color:var(--hl-f)">pip-sync</span> requirements.txt` }} /></pre>

        <h2>Isolating Dependencies with Virtual Environments</h2>
        <p>
          Declaring dependencies tells you what is needed. Isolation ensures
          that only those packages are available. In Python, virtual
          environments provide this isolation:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Create a virtual environment</span>
<span style="color:var(--hl-f)">python</span> -m venv .venv

<span style="color:var(--hl-c)"># Activate it</span>
<span style="color:var(--hl-f)">source</span> .venv/bin/activate

<span style="color:var(--hl-c)"># Install only the declared dependencies</span>
<span style="color:var(--hl-f)">pip</span> install -r requirements.txt

<span style="color:var(--hl-c)"># Now only these packages are available to the application</span>
<span style="color:var(--hl-f)">pip</span> list
<span style="color:var(--hl-c)"># flask        3.0.0</span>
<span style="color:var(--hl-c)"># sqlalchemy   2.0.23</span>
<span style="color:var(--hl-c)"># redis        5.0.1</span>
<span style="color:var(--hl-c)"># ... (only declared packages and their dependencies)</span>` }} /></pre>

        <p>
          Without a virtual environment, <code>pip install</code> puts
          packages into the global Python environment. Every project on
          the machine shares the same packages. With a virtual environment,
          each project has its own isolated set of packages. Project A can
          use <code>SQLAlchemy 1.4</code> while Project B uses{" "}
          <code>SQLAlchemy 2.0</code> on the same machine with no conflict.
        </p>
        <p>
          Isolation also catches missing declarations. If you forget to add
          a library to <code>requirements.txt</code>, it will not be in the
          virtual environment, and your code will fail immediately rather
          than silently relying on a globally installed copy.
        </p>

        <h2>System-Level Dependencies</h2>
        <p>
          Not all dependencies are Python packages. Some are system tools
          or C libraries that Python packages depend on:
        </p>
        <ul>
          <li>
            <code>psycopg2</code> needs <code>libpq</code> (the PostgreSQL
            client library)
          </li>
          <li>
            <code>Pillow</code> needs <code>libjpeg</code> and{" "}
            <code>zlib</code> for image processing
          </li>
          <li>
            A subprocess call to <code>ffmpeg</code> or{" "}
            <code>wkhtmltopdf</code> requires those tools to be installed
          </li>
        </ul>
        <p>
          Virtual environments do not handle these. A <code>pip install</code>{" "}
          for <code>psycopg2</code> will fail if <code>libpq</code> is not
          on the system. The 12-factor principle says a twelve-factor app
          never relies on the implicit existence of system-wide packages.
          These system dependencies need to be documented, and ideally
          managed through infrastructure tooling.
        </p>
        <p>
          This is one of the reasons containers became the standard. A
          Dockerfile can declare both Python packages and system packages
          in one place:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-k)">FROM</span> python:3.12-slim

<span style="color:var(--hl-c)"># System-level dependencies - documented and reproducible</span>
<span style="color:var(--hl-k)">RUN</span> apt-get update && apt-get install -y \\
    libpq-dev \\
    libjpeg-dev \\
    && rm -rf /var/lib/apt/lists/*

<span style="color:var(--hl-k)">WORKDIR</span> /app

<span style="color:var(--hl-c)"># Python dependencies - declared and pinned</span>
<span style="color:var(--hl-k)">COPY</span> requirements.txt .
<span style="color:var(--hl-k)">RUN</span> pip install --no-cache-dir -r requirements.txt

<span style="color:var(--hl-k)">COPY</span> . .
<span style="color:var(--hl-k)">CMD</span> [<span style="color:var(--hl-s)">"gunicorn"</span>, <span style="color:var(--hl-s)">"--bind"</span>, <span style="color:var(--hl-s)">"0.0.0.0:5000"</span>, <span style="color:var(--hl-s)">"app:app"</span>]` }} /></pre>

        <p>
          Now every dependency - Python libraries and system packages - is
          declared in version-controlled files. Anyone can build the image
          and get the exact same environment. No surprises.
        </p>

        <h2>The Complete Setup: Clone to Running</h2>
        <p>
          When dependencies are declared and isolated properly, a new
          developer should be able to go from cloning the repository to
          running the application with a few deterministic commands:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Clone the repository</span>
<span style="color:var(--hl-f)">git</span> clone https://github.com/myorg/myapp.git
<span style="color:var(--hl-f)">cd</span> myapp

<span style="color:var(--hl-c)"># Create and activate a virtual environment</span>
<span style="color:var(--hl-f)">python</span> -m venv .venv
<span style="color:var(--hl-f)">source</span> .venv/bin/activate

<span style="color:var(--hl-c)"># Install all declared dependencies</span>
<span style="color:var(--hl-f)">pip</span> install -r requirements.txt

<span style="color:var(--hl-c)"># Run the application</span>
<span style="color:var(--hl-f)">python</span> app.py` }} /></pre>

        <p>
          No hunting for undocumented packages. No guessing which version
          to install. No asking a colleague what they have on their machine.
          The requirements file is the single source of truth.
        </p>
        <p>
          With Docker, the setup is even simpler:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-f)">git</span> clone https://github.com/myorg/myapp.git
<span style="color:var(--hl-f)">cd</span> myapp
<span style="color:var(--hl-f)">docker</span> compose up` }} /></pre>

        <p>
          One command, and every dependency - Python packages, system
          libraries, the exact Python version - is handled. This is the
          end goal of proper dependency management: the application works
          the same way on every machine, every time.
        </p>

        <h2>Key Takeaway</h2>
        <p>
          Declare every dependency explicitly. Pin versions so builds are
          reproducible. Use lock files to capture the full dependency tree.
          Isolate dependencies with virtual environments so nothing leaks
          in from the global system. Document system-level dependencies,
          or better yet, use containers to declare everything in one place.
          When this is done right, any developer can clone the repository
          and have a working application in minutes. When it is not, every
          new machine is a mystery and every deploy is a gamble.
        </p>
      </div>

      <RelatedPosts slug="on-dependency-management" />
    </article>
  );
}
