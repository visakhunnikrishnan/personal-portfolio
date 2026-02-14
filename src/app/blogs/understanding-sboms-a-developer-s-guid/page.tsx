import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/understanding-sboms-a-developer-s-guid/developer-with-cat-at-computer.png";
import img0 from "../../../../public/blog/understanding-sboms-a-developer-s-guid/sbom-dependency-tree-diagram.png";
import img1 from "../../../../public/blog/understanding-sboms-a-developer-s-guid/sbom-dependency-license-compliance-tree.png";
import img9 from "../../../../public/blog/understanding-sboms-a-developer-s-guid/container-sbom-generation-with-trivy.png";
import img10 from "../../../../public/blog/understanding-sboms-a-developer-s-guid/sbom-generation-and-analysis-challenges.png";
import img14 from "../../../../public/blog/understanding-sboms-a-developer-s-guid/dependency-track-components-dashboard.png";
import img16 from "../../../../public/blog/understanding-sboms-a-developer-s-guid/dependency-track-audit-vulnerabilities-view.png";
import { CodeBlock } from "@/components/code-block";
import { CvssEpssChart } from "@/components/cvss-epss-chart";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "Third-Party Dependency Management: A Developer's Guide",
  description:
    "How SBOMs help you track what's in your software, why regulations now require them with real penalties, and the practical path to managing third-party dependencies.",
  keywords: ["SBOM", "software bill of materials", "supply chain security", "CycloneDX", "SPDX", "vulnerability management", "third-party dependencies", "open source security", "CVSS", "EPSS"],
  openGraph: {
    title: "Third-Party Dependency Management: A Developer's Guide",
    description:
      "How SBOMs help you track what's in your software, why regulations now require them with real penalties, and the practical path to managing third-party dependencies.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Third-Party Dependency Management: A Developer's Guide",
    description: "How SBOMs help you track what's in your software, why regulations now require them, and the practical path to managing third-party dependencies.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Third-Party Dependency Management: A Developer&apos;s Guide
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2025-01-29">Jan 29, 2025</time>
          <span aria-hidden="true">&middot;</span>
          <span>20 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="Third-Party Dependency Management: A Developer's Guide"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          When Log4Shell dropped in December 2021, I watched teams scramble to
          answer a single question: &quot;Are we affected?&quot; Some teams had
          the answer in minutes. Most didn&apos;t. They spent days manually
          checking dependency trees, grepping through lockfiles, pinging Slack
          channels asking who used what. The difference between those two groups
          came down to one thing - whether they had third-party dependency management in place.
          That experience made it clear to me that SBOMs aren&apos;t just a
          compliance checkbox. They&apos;re a practical engineering tool that
          pays for itself the first time something goes wrong.
        </p>

        <hr />

        <h2>What Is an SBOM?</h2>
        <p>
          A Software Bill of Materials is exactly what it sounds like - a list of
          everything your software is made of. Think of it like the ingredients
          list on packaged food. It tells you every library, framework, and
          dependency your application uses, along with version numbers, licenses,
          and where each component came from.
        </p>
        <p>
          But the interesting part isn&apos;t the direct dependencies you chose -
          it&apos;s the transitive ones you inherited. When you add{" "}
          <code>requests</code> to your Python project, you also get{" "}
          <code>urllib3</code>, <code>certifi</code>,{" "}
          <code>charset-normalizer</code>, and <code>idna</code>. When you add{" "}
          <code>pandas</code>, you get <code>numpy</code>,{" "}
          <code>python-dateutil</code>, and <code>pytz</code>. A typical
          application might declare 20 direct dependencies but actually contain
          200+ components when you trace the full tree.
        </p>

        <Image
          src={img0}
          alt="Dependency tree showing an application with direct dependencies (requests, numpy, pandas) and their transitive dependencies"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          An SBOM captures this full picture - not just what you installed, but
          everything that came along for the ride. And that distinction is what
          makes it useful. The vulnerabilities and license issues that bite you
          are almost always in transitive dependencies you never explicitly chose.
        </p>

        <hr />

        <h2>Why SBOMs Matter</h2>

        <h3>The Log4Shell Wake-Up Call</h3>
        <p>
          The strongest case for SBOMs comes from what happens when you
          don&apos;t have one.
        </p>
        <p>
          In December 2021, a critical vulnerability (CVE-2021-44228) was
          discovered in Log4j, a ubiquitous Java logging library. It scored a
          perfect 10.0 on the CVSS severity scale - an attacker could execute
          arbitrary code on any server running the affected version, just by
          sending a specially crafted string.
        </p>
        <p>
          The vulnerability itself was severe. But the real problem was figuring
          out where Log4j was. It wasn&apos;t just in applications that directly
          depended on it - it was buried three, four, five levels deep in
          dependency trees. An application using Spring Framework used Spring
          Boot, which used Spring Boot Starter Logging, which used Log4j. You
          wouldn&apos;t see it in your <code>pom.xml</code> or{" "}
          <code>package.json</code>, but it was there.
        </p>
        <p>
          Organizations with SBOMs could query their inventory and have a
          complete list of affected applications within hours. Everyone else was
          searching manually - and many didn&apos;t find everything.
        </p>

        <pre><code>{`# SBOM query result — finding every app affected by Log4Shell
# This is what teams WITH an SBOM could answer in minutes

Component:  org.apache.logging.log4j:log4j-core
Vulnerable: v2.0 – v2.17.0
CVE:        CVE-2021-44228 (Log4Shell)
CVSS:       10.0 (Critical)

Affected applications:
  ├── payment-service      v2.14.1  (direct dependency)
  ├── order-api            v2.11.0  (via spring-boot-starter-logging)
  ├── analytics-pipeline   v2.16.0  (via kafka-clients → log4j)
  └── auth-gateway         v2.14.1  (via elasticsearch-rest-client)`}</code></pre>

        <h3>Regulations Are Making This Mandatory</h3>
        <p>
          Log4Shell was the event that moved SBOMs from &quot;nice to have&quot;
          to &quot;required.&quot; Governments and industry bodies worldwide now
          mandate software component transparency - with real penalties for
          non-compliance.
        </p>
        <p>
          <strong>
            <a
              href="https://www.federalregister.gov/documents/2021/05/17/2021-10460/improving-the-nations-cybersecurity"
              target="_blank"
              rel="noopener noreferrer"
            >
              US Executive Order 14028
            </a>
          </strong>{" "}
          (2021) requires vendors selling software to the federal government to
          provide an SBOM. There&apos;s no direct fine, but non-compliance means
          losing federal contracts - and potential debarment from future
          procurement.
        </p>
        <p>
          <strong>
            <a
              href="https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng"
              target="_blank"
              rel="noopener noreferrer"
            >
              EU Cyber Resilience Act
            </a>
          </strong>{" "}
          (2024, fully enforced by December 2027) goes further. Manufacturers of
          any product with digital elements sold in the EU must generate and
          maintain a machine-readable SBOM. Penalties reach up to{" "}
          <strong>EUR 15 million or 2.5% of global annual turnover</strong>.
          Authorities can also withdraw non-compliant products from the market
          entirely.
        </p>
        <p>
          <strong>
            <a
              href="https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng"
              target="_blank"
              rel="noopener noreferrer"
            >
              EU NIS2 Directive
            </a>
          </strong>{" "}
          (effective October 2024) requires essential and important entities to
          implement supply chain security measures - including tracking software
          components from suppliers. Penalties reach{" "}
          <strong>EUR 10 million or 2% of turnover</strong>, and executives can
          face personal liability.
        </p>
        <p>
          In regulated industries, the requirements are even more specific. The{" "}
          <strong>
            <a
              href="https://www.fda.gov/media/173984/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              FDA now requires SBOMs
            </a>
          </strong>{" "}
          for medical device premarket submissions - without one, your device
          simply won&apos;t get approved.{" "}
          <strong>
            <a
              href="https://www.pcisecuritystandards.org/standards/pci-dss/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PCI DSS 4.0
            </a>
          </strong>{" "}
          (mandatory since March 2025) requires a complete inventory of all
          third-party software components in payment systems.{" "}
          <strong>
            <a
              href="https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng"
              target="_blank"
              rel="noopener noreferrer"
            >
              DORA
            </a>
          </strong>{" "}
          (effective January 2025) requires financial institutions in the EU to
          track all ICT dependencies, including open-source libraries.
        </p>

        <h3>What Organizations Do to Comply</h3>
        <p>
          In practice, compliance means building dependency management into your
          development workflow rather than treating it as a separate audit
          exercise. Most organizations that take this seriously end up doing some
          combination of the following:
        </p>
        <ul>
          <li>
            <strong>SBOM generation in CI/CD</strong>: Every build produces a
            signed, versioned SBOM alongside the artifact. Not a one-time scan -
            a continuous process.
          </li>
          <li>
            <strong>SCA tooling with policy gates</strong>: Builds fail
            automatically if a prohibited license or a critical unpatched CVE is
            detected. No manual review needed for clear violations.
          </li>
          <li>
            <strong>Vendor SBOM requirements</strong>: Procurement contracts
            require vendors to deliver machine-readable SBOMs with each release.
            Those SBOMs get ingested into the same vulnerability management
            platform as internally generated ones.
          </li>
          <li>
            <strong>Vulnerability response SLAs</strong>: Defined remediation
            timelines based on severity - critical within 72 hours, high within 7
            days, medium within 30 days. The SBOM makes it possible to identify
            affected applications the moment a new CVE is published.
          </li>
          <li>
            <strong>License allow-lists</strong>: An organizational policy
            defining which licenses are approved (MIT, Apache 2.0, BSD),
            restricted (LGPL), or prohibited (GPL, AGPL) - enforced
            automatically during builds.
          </li>
        </ul>

        <h3>License Compliance</h3>
        <p>
          Security gets the headlines, but license compliance is where SBOMs
          quietly save you from expensive problems.
        </p>
        <p>
          Open-source licenses come with obligations. MIT and Apache 2.0 are
          permissive - you can use them in commercial software with minimal
          requirements. But GPL licenses require that any software linking to GPL
          code must also be distributed under GPL. If you&apos;re building
          proprietary software and a transitive dependency pulls in a GPL
          library, you have a potential legal problem.
        </p>
        <p>
          The tricky part is that this can happen without you noticing. You add a
          library with a permissive license, but one of its dependencies deep in
          the tree uses GPL. Without an SBOM that tracks licenses through the
          full dependency chain, you might not discover this until legal review -
          or worse, after release.
        </p>

        <Image
          src={img1}
          alt="Dependency tree with license information showing a GPL violation deep in the transitive dependency chain"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h3>Incident Response</h3>
        <p>
          When a breach happens, the first question is &quot;what&apos;s
          affected?&quot; An SBOM turns this from a days-long investigation into
          a database query. You can immediately identify which applications use
          the compromised component, which versions they&apos;re running, and
          which environments they&apos;re deployed in. The difference between
          patching within hours and patching within weeks can be the difference
          between a contained incident and a major breach.
        </p>

        <hr />

        <h2>What&apos;s Inside an SBOM</h2>
        <p>At minimum, a useful SBOM contains:</p>
        <ul>
          <li>
            <strong>Component name and version</strong>: What library, and which
            exact version
          </li>
          <li>
            <strong>Supplier/author</strong>: Who published or maintains the
            component
          </li>
          <li>
            <strong>Dependency relationships</strong>: What depends on what
            (direct vs transitive)
          </li>
          <li>
            <strong>License information</strong>: What license each component
            uses
          </li>
          <li>
            <strong>Unique identifiers</strong>: A way to unambiguously reference
            each component (like Package URL or CPE)
          </li>
        </ul>
        <p>
          Two standards dominate the SBOM landscape:{" "}
          <strong>CycloneDX</strong> and <strong>SPDX</strong>.
        </p>
        <p>
          <strong>CycloneDX</strong> was designed specifically for application
          security and supply chain analysis. It&apos;s lightweight, JSON-native,
          and supported by OWASP. It focuses on making SBOMs actionable - not
          just documenting components but making it easy to link them to
          vulnerabilities and license obligations.
        </p>

        <CodeBlock code={`// CycloneDX format — lightweight, security-focused, OWASP-backed
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "metadata": {
    "component": {
      "type": "application",
      "name": "my-application",
      "version": "1.0.0"
    }
  },
  "components": [
    {
      "type": "library",
      "name": "pandas",
      "version": "2.1.0",
      "purl": "pkg:pypi/pandas@2.1.0",
      "licenses": [
        { "license": { "id": "BSD-3-Clause" } }
      ]
    },
    {
      "type": "library",
      "name": "numpy",
      "version": "1.25.2",
      "purl": "pkg:pypi/numpy@1.25.2",
      "licenses": [
        { "license": { "id": "BSD-3-Clause" } }
      ]
    }
  ]
}`} />

        <p>
          <strong>SPDX</strong> (Software Package Data Exchange) comes from the
          Linux Foundation and has a broader scope. It was originally designed for
          license compliance and has deep support for expressing complex licensing
          relationships. It&apos;s widely adopted in the open-source community
          and is recognized as an ISO standard (ISO/IEC 5962:2021).
        </p>

        <CodeBlock code={`// SPDX format — ISO standard (ISO/IEC 5962:2021), license-compliance focused
{
  "spdxVersion": "SPDX-2.3",
  "dataLicense": "CC0-1.0",
  "SPDXID": "SPDXRef-DOCUMENT",
  "name": "my-application",
  "packages": [
    {
      "name": "pandas",
      "SPDXID": "SPDXRef-pandas",
      "versionInfo": "2.1.0",
      "downloadLocation": "https://pypi.org/project/pandas/2.1.0/",
      "filesAnalyzed": false,
      "licenseConcluded": "BSD-3-Clause",
      "licenseDeclared": "BSD-3-Clause"
    },
    {
      "name": "numpy",
      "SPDXID": "SPDXRef-numpy",
      "versionInfo": "1.25.2",
      "downloadLocation": "https://pypi.org/project/numpy/1.25.2/",
      "filesAnalyzed": false,
      "licenseConcluded": "BSD-3-Clause",
      "licenseDeclared": "BSD-3-Clause"
    }
  ]
}`} />

        <p>
          Which should you use? In practice, most modern tools support both. If
          your primary concern is security and vulnerability management,
          CycloneDX tends to be more ergonomic. If you&apos;re dealing with
          complex licensing requirements or working with the Linux Foundation
          ecosystem, SPDX is a natural fit. Many organizations generate both and
          convert between them as needed.
        </p>

        <hr />

        <h2>How SBOMs Get Generated</h2>
        <p>
          There are three main approaches, and most teams end up using a
          combination.
        </p>

        <h3>Source Code and Manifest Analysis</h3>
        <p>
          The most common approach is analyzing your project&apos;s manifest and
          lock files - <code>package-lock.json</code>,{" "}
          <code>requirements.txt</code>, <code>go.sum</code>,{" "}
          <code>pom.xml</code>, <code>Gemfile.lock</code>. Tools parse these
          files to build the full dependency tree without needing to execute any
          code.
        </p>
        <p>
          This is fast and reliable for declared dependencies, but it misses
          anything that doesn&apos;t go through a package manager - vendored
          code, embedded libraries, or dependencies loaded at runtime.
        </p>

        <h3>Container Image Scanning</h3>
        <p>
          For containerized applications, tools like Trivy scan the entire
          container image - not just your application code but also the OS-level
          packages in the base image. This matters because your{" "}
          <code>python:3.11</code> base image ships with hundreds of system
          packages that don&apos;t appear in any application-level manifest file.
        </p>

        <Image
          src={img9}
          alt="Container-level SBOM generation flow: pull image from registry, decompose layers, catalog OS and application dependencies, compile SBOM"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          The process involves pulling the container image, decomposing its
          layers, identifying the base OS, cataloging OS-level packages (via{" "}
          <code>dpkg</code>, <code>rpm</code>, etc.), detecting
          application-level dependencies from manifest files, scanning for
          embedded libraries, and compiling everything into a single SBOM. Tools
          like Syft and Trivy handle all of this automatically.
        </p>
        <p>
          Container scanning gives you the fullest picture, but it only captures
          what&apos;s in the image at scan time. If your runtime configuration
          pulls in additional dependencies, those won&apos;t be captured.
        </p>

        <h3>Binary Scanning</h3>
        <p>
          Sometimes you don&apos;t have source code or manifest files - you have
          a compiled binary, a vendor-provided <code>.jar</code>, or a
          proprietary shared library. Binary scanning tools attempt to identify
          components by examining the binary itself. They look for embedded
          strings (version numbers, copyright notices, library names), file
          hashes that match known packages, and structural patterns like ELF
          headers or PE metadata.
        </p>
        <p>
          Tools like Syft can scan binaries and attempt to extract dependency
          information. For Java, this works reasonably well because{" "}
          <code>.jar</code> files contain <code>pom.properties</code> and
          manifest metadata. For Go binaries, the compiler embeds module
          information that tools can read directly. But for C/C++ binaries, the
          story is different - there&apos;s no standardized way to embed
          dependency metadata, so tools fall back to heuristics like matching
          strings or file hashes against known libraries.
        </p>
        <p>
          This makes binary scanning inherently less reliable than manifest
          analysis. A statically linked C library leaves almost no trace in the
          final binary. Vendored code that&apos;s been modified won&apos;t match
          any known hash. Version strings can be stripped during compilation.
          And even when a tool does identify a component, it may get the version
          wrong - reporting the version of the library that was linked rather
          than the patched fork actually in use. Binary scanning is useful as a
          last resort when source isn&apos;t available, but you should treat its
          output as a starting point that needs verification, not a definitive
          inventory.
        </p>

        <h3>CI/CD Integration</h3>
        <p>
          The most practical approach is generating SBOMs automatically as part
          of your build pipeline. Every build produces an SBOM alongside the
          artifact, so your inventory stays current without anyone needing to
          remember to run a scan.
        </p>
        <p>
          A typical setup looks like: build your artifact, generate the SBOM from
          your manifest and lock files using a tool like CycloneDX CLI, upload
          the SBOM to an analysis platform like Dependency-Track, and gate the
          pipeline on policy violations.
        </p>
        <p>
          The key insight is that SBOM generation should be a build step, not a
          separate process. If it&apos;s separate, it becomes something people
          skip when they&apos;re in a hurry - which is exactly when you need it
          most.
        </p>

        <hr />

        <h2>The Hard Parts</h2>
        <p>
          SBOMs solve a real problem, but the ecosystem has rough edges that
          are worth understanding before you invest in tooling.
        </p>

        <Image
          src={img10}
          alt="Challenges of SBOM generation and analysis: divergence in standards compliance, maturity gap in tools, data availability issues, and difficulty identifying exploitable vulnerabilities"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h3>Incomplete Data</h3>
        <p>
          Not all software vendors provide comprehensive component information.
          Some omit transitive dependencies. Others use proprietary formats that
          don&apos;t map cleanly to SPDX or CycloneDX. The result is that an
          SBOM generated by one tool for the same application might look
          different from one generated by another tool - which undermines the
          whole point of having a standard format.
        </p>

        <h3>Tool Inconsistency</h3>
        <p>
          Different SBOM generators interpret standards differently. I&apos;ve
          seen cases where two tools analyzing the same{" "}
          <code>package-lock.json</code> produce different component counts
          because they disagree on what constitutes a &quot;component.&quot; Is a
          dev dependency a component? What about optional dependencies? Peer
          dependencies? The standards leave enough ambiguity that tooling
          diverges.
        </p>
        <p>
          If no single tool covers your entire stack, you&apos;ll need multiple
          tools and a way to merge their outputs. CycloneDX CLI handles this
          well - it can merge SBOMs from different sources into a single
          document.
        </p>

        <h3>The Exploitability Question</h3>
        <p>
          This is the biggest practical challenge. An SBOM might tell you that
          your application contains a component with a known CVE, but that
          doesn&apos;t necessarily mean your application is vulnerable. Maybe
          your code never calls the affected function. Maybe the vulnerability
          requires a specific configuration you don&apos;t use. Maybe it&apos;s
          in a test dependency that never reaches production.
        </p>
        <p>
          This is where <strong>VEX</strong> (Vulnerability Exploitability
          eXchange) comes in. A VEX document is a companion to an SBOM that says
          &quot;yes, this component has CVE-XXXX, but it&apos;s not exploitable
          in our context because...&quot; VEX is the bridge between knowing
          what&apos;s in your software and knowing what actually puts you at
          risk. It&apos;s still maturing as a standard, and creating accurate VEX
          documents requires manual analysis - but it&apos;s the missing piece
          that makes SBOMs truly actionable.
        </p>

        <blockquote>
          <p>
            An SBOM without exploitability context gives you a list of
            everything that could be wrong. VEX tells you what actually is. The
            difference matters when you&apos;re looking at hundreds of CVEs and
            need to decide what to fix first.
          </p>
        </blockquote>

        <hr />

        <h2>Making It Work: Tools and Prioritization</h2>

        <h3>Vulnerability Databases</h3>
        <p>
          An SBOM tells you what&apos;s in your software. But to know if any of
          those components have known security issues, you need something to
          check them against. That&apos;s where vulnerability databases come in.
        </p>
        <p>
          The foundation of the ecosystem is the{" "}
          <strong>CVE</strong> (Common Vulnerabilities and Exposures) program,
          run by MITRE. When a new vulnerability is discovered, it gets assigned
          a unique identifier like CVE-2021-44228. This ID becomes the universal
          reference that every tool, database, and advisory uses to talk about
          the same issue.
        </p>
        <p>
          <strong>NVD</strong> (National Vulnerability Database), maintained by
          NIST, enriches each CVE with severity scores (CVSS), affected version
          ranges, and references. It&apos;s the most widely used source and what
          most SCA tools query by default.{" "}
          <strong>OSS Index</strong> (by Sonatype) focuses specifically on
          open-source components and maps vulnerabilities to package manager
          coordinates - so instead of searching by library name, you can query
          by the exact <code>pkg:npm/lodash@4.17.20</code> you found in your
          SBOM.{" "}
          <strong>GitHub Advisory Database</strong> aggregates CVEs along with
          community-submitted advisories and maps them directly to GitHub
          ecosystem packages, which is what powers Dependabot alerts.
        </p>
        <p>
          The practical implication: when you upload an SBOM to an analysis tool,
          it takes each component and its version, queries these databases, and
          tells you which known vulnerabilities apply. The richer the SBOM (exact
          versions, package URLs), the more accurate the matching.
        </p>

        <h3>SCA Tools and Dependency-Track</h3>
        <p>
          Software Composition Analysis (SCA) tools automate this entire
          workflow - scanning applications, generating SBOMs, and
          cross-referencing components against the vulnerability databases above.
          Snyk, GitHub&apos;s dependency graph with Dependabot, and CycloneDX CLI
          are all common choices for generation. For analysis, OWASP
          Dependency-Track is the most established open-source option.
        </p>
        <p>
          Dependency-Track ingests SBOMs (in CycloneDX or SPDX format),
          cross-references them against multiple vulnerability databases (NVD,
          OSS Index, VulnDB), and gives you a dashboard showing what&apos;s at
          risk across all your projects.
        </p>

        <Image
          src={img14}
          alt="Dependency-Track dashboard showing 1360 components with their versions, licenses, risk scores, and vulnerability counts"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          What makes Dependency-Track useful in practice is its continuous
          monitoring. You don&apos;t just scan once - it keeps tracking your
          components against new vulnerability disclosures. When a new CVE drops,
          you get a notification for every project that contains the affected
          component. It also supports policy creation, so you can enforce rules
          like &quot;no GPL dependencies in production services&quot; or
          &quot;no components with critical unpatched CVEs.&quot;
        </p>

        <Image
          src={img16}
          alt="Dependency-Track audit vulnerabilities view showing CVEs with severity levels (critical, high, medium), affected components, and analysis status"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h3>Prioritizing What to Fix</h3>
        <p>
          A typical scan might surface hundreds of CVEs across your
          applications. You can&apos;t fix them all at once, so you need a way
          to decide what matters most. Three inputs help here: CVSS, EPSS, and
          KEV.
        </p>
        <p>
          <strong>CVSS</strong> (Common Vulnerability Scoring System) answers
          the question: <em>how bad is this if it gets exploited?</em> It rates
          severity on a 0-10 scale based on factors like attack vector (does
          the attacker need network access or local access?), complexity (is it
          trivial to exploit or does it require specific conditions?), and
          impact (does it compromise confidentiality, integrity, or
          availability?). A CVSS of 9.8 means it&apos;s remotely exploitable
          with no special conditions and gives the attacker full control. A CVSS
          of 3.1 means it requires local access and has limited impact.
        </p>
        <p>
          <strong>EPSS</strong> (Exploit Prediction Scoring System) answers a
          different question:{" "}
          <em>how likely is it that someone will actually exploit this?</em> It
          uses machine learning on historical exploit data, vulnerability
          characteristics, and threat intelligence to produce a probability
          score between 0 and 1. An EPSS of 0.97 means there&apos;s a 97%
          chance this vulnerability will be exploited in the wild within the
          next 30 days. An EPSS of 0.01 means almost nobody is targeting it.
        </p>
        <p>
          The insight is that CVSS and EPSS measure different things, and
          they don&apos;t always correlate. A vulnerability can score 9.8 on
          CVSS (theoretically devastating) but 0.02 on EPSS (nobody is actually
          exploiting it - maybe because the affected software is rare, or the
          exploit requires unusual conditions). Conversely, a CVSS 6.5
          vulnerability with an EPSS of 0.85 is being actively targeted right
          now.
        </p>

        <CvssEpssChart />

        <p>
          <strong>KEV</strong> (Known Exploited Vulnerabilities) is CISA&apos;s
          catalog of vulnerabilities that are{" "}
          <em>confirmed to be actively exploited in the wild</em>. Unlike EPSS
          which predicts likelihood, KEV is based on evidence - a vulnerability
          lands on the KEV list only when CISA has confirmed real-world
          exploitation. The catalog currently contains over 1,100
          vulnerabilities and is updated regularly.
        </p>
        <p>
          KEV matters because it removes all guesswork. If a vulnerability in
          your SBOM appears on the KEV list, it&apos;s not a theoretical risk -
          someone is already using it to break into systems. CISA&apos;s{" "}
          <a
            href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Binding Operational Directive 22-01
          </a>{" "}
          requires federal agencies to remediate KEV vulnerabilities within
          strict deadlines (typically 2-3 weeks). Even if you&apos;re not a
          federal agency, treating KEV entries as mandatory urgent fixes is a
          good baseline policy.
        </p>
        <p>
          The practical approach: KEV items first (confirmed exploits, no
          debate), then high CVSS with high EPSS (severe and likely to be
          exploited), then high CVSS with low EPSS (severe but not actively
          targeted), then the rest. This prevents the common trap where teams
          spend weeks patching theoretically severe vulnerabilities while
          ignoring moderate ones that attackers are actively using.
        </p>

        <hr />

        <h2>Key Takeaway</h2>
        <p>
          SBOMs aren&apos;t a silver bullet for software security, but
          they&apos;re the foundation that makes everything else work. You
          can&apos;t manage vulnerabilities in components you don&apos;t know
          about. You can&apos;t ensure license compliance for dependencies you
          haven&apos;t inventoried. You can&apos;t respond quickly to incidents
          when you first need to figure out what&apos;s running where.
        </p>
        <p>
          The practical path is straightforward: generate SBOMs as part of your
          build pipeline, feed them into an analysis tool like Dependency-Track,
          and set up alerts for new vulnerabilities in your components. Start with
          your most critical applications and expand from there. The tooling
          isn&apos;t perfect - you&apos;ll run into inconsistencies between
          generators and noise from unexploitable CVEs - but it&apos;s good
          enough to provide real value. And the ecosystem is improving fast.
        </p>
      </div>

      <RelatedPosts slug="understanding-sboms-a-developer-s-guid" />
    </article>
  );
}
