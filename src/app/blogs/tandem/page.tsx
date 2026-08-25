import type { Metadata } from "next";
import Image from "next/image";

import heroImg from "../../../../public/blog/tandem/banner.jpg";
import { RelatedPosts } from "@/components/related-posts";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Tandem: An Open-Source Software KVM for macOS",
  description:
    "Why I built Tandem, an open-source software KVM for macOS, after Universal Control kept failing me - and the mechanisms that make it dependable: explicit pairing, automatic reconnection, encrypted peer-to-peer input streaming, and a state machine that never leaves stuck keys behind.",
  keywords: [
    "Tandem",
    "software KVM",
    "Universal Control alternative",
    "macOS KVM",
    "keyboard sharing Mac",
    "mouse sharing Mac",
    "Bonjour mDNS",
    "ChaCha20-Poly1305",
    "clipboard sync",
    "open source",
  ],
  openGraph: {
    title: "Tandem: An Open-Source Software KVM for macOS",
    description:
      "Why I built Tandem, an open-source software KVM for macOS, after Universal Control kept failing me - and the mechanisms that make it dependable.",
    type: "article",
    publishedTime: "2026-08-25",
    authors: ["Visakh Unni"],
    images: [
      {
        url: "https://www.visakhunni.com/blog/tandem/banner.jpg",
        width: 1920,
        height: 920,
        alt: "Tandem - one keyboard and trackpad, all your Macs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tandem: An Open-Source Software KVM for macOS",
    description:
      "Why I built Tandem, an open-source software KVM for macOS, after Universal Control kept failing me - and the mechanisms that make it dependable.",
    images: ["https://www.visakhunni.com/blog/tandem/banner.jpg"],
  },
};

export default function TandemBlog() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Tandem: An Open-Source Software KVM for macOS
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2026-08-25">Aug 25, 2026</time>
          <span aria-hidden="true">&middot;</span>
          <span>8 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="Tandem - one keyboard and trackpad, all your Macs"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          <a
            href="https://github.com/visakhunnikrishnan/Tandem"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tandem
          </a>{" "}
          is an open-source software KVM for macOS that I built and recently
          published. Run it on two Macs sitting side by side, pair them once
          with a 6-digit code, and push your cursor off the edge of one
          screen to control the other - clipboard included. Here is why I
          built it, and how it works.
        </p>

        <hr />

        <h2>Why Another KVM</h2>

        <p>
          A software KVM (keyboard, video, mouse) lets one keyboard and
          trackpad control several computers over the network, as if they
          were one machine. macOS ships this built in as{" "}
          <a
            href="https://support.apple.com/en-us/102459"
            target="_blank"
            rel="noopener noreferrer"
          >
            Universal Control
          </a>
          , and when it works, it is great.
        </p>

        <p>
          The problem is that it kept failing me. Devices stop seeing each
          other after sleep. Reconnection is hit-or-miss. And when it
          silently fails, there is nothing to inspect and nothing to
          restart - no logs, no status, no command that tells you what is
          wrong. You toggle settings, wave the cursor at the screen edge,
          and eventually reboot something. For a tool I depend on for
          day-to-day work, that was not good enough.
        </p>

        <p>
          So I finally decided to build an open-source alternative: a KVM
          built around dependability. Explicit
          pairing instead of ambient magic. Automatic reconnection after
          sleep and network blips. A <code>tandem doctor</code> command that
          diagnoses permissions and environment. And logs you can actually
          read when something goes wrong.
        </p>

        <h2>What Tandem Is</h2>

        <p>
          Tandem is a Python CLI. On both Macs:
        </p>

        <CodeBlock
          code={`pipx install tandem-kvm   # or: pip install tandem-kvm
tandem doctor             # verify permissions & environment`}
        />

        <p>
          Then, with the second Mac to the right of the first:
        </p>

        <CodeBlock
          code={`# Mac on the left:
tandem --direction right

# Mac on the right:
tandem --direction left`}
        />

        <p>
          A 6-digit pairing code appears on one screen; you type it on the
          other. From then on the machines find each other, authenticate,
          and reconnect on their own. Slide the cursor off the edge and it
          appears on the other Mac:
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tandem/demo.gif"
          alt="Two Macs pairing in the terminal, then one cursor sliding across both"
          className="w-full"
        />

        <p>
          Three or more Macs work too - each machine names its neighbors and
          they form a chain the cursor walks across:
        </p>

        <CodeBlock
          code={`tandem --right mac-2               # Mac-1, leftmost
tandem --left mac-1 --right mac-3   # Mac-2, middle
tandem --left mac-2                 # Mac-3, rightmost`}
        />

        <h2>How It Works</h2>

        <p>
          Every machine runs the identical program - there is no server and
          no client. Machines discover each other on the local network,
          prove they are <em>your</em> Macs with the one-time pairing code,
          and stream input to each other over encrypted TCP connections. The
          rest of this post walks through the mechanisms that make that
          dependable.
        </p>

        <h3>Five modes, one at a time</h3>

        <p>
          Every machine is always in exactly one of five modes:{" "}
          <strong>LOCAL</strong> (input is yours), <strong>CONTROLLING</strong>{" "}
          (your input is captured and forwarded to a neighbor, your cursor
          parked and hidden), <strong>CONTROLLED</strong> (a neighbor&apos;s
          input is injected here), <strong>RELAYING</strong> (the cursor has
          walked across this machine onto the next one; input passes
          straight through), and <strong>DISCONNECTED</strong>.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tandem/modes.svg"
          alt="The control mode state machine: LOCAL, CONTROLLING, CONTROLLED, RELAYING, and DISCONNECTED, with the allowed transitions between them"
          className="w-full"
        />

        <p>
          Why a strict state machine? Because control messages travel over a
          network, they can arrive late, duplicated, or out of order. Each
          machine validates every requested mode change against its current
          mode and discards invalid ones - which makes inconsistent states
          unreachable. Both machines can never end up in CONTROLLED at the
          same time, each waiting for input from the other.
        </p>

        <p>
          The safety-critical side effects - releasing held keys, restoring
          the hidden cursor - are attached to the mode transitions, not to
          individual network messages. That way they run on{" "}
          <em>every</em> path out of a mode, including disconnects and
          crashes. A dropped connection can never leave a key held down on
          the other machine.
        </p>

        <h3>Switching only at the outer edge</h3>

        <p>
          The classic multi-monitor bug in tools like this: you move the
          cursor from your laptop screen to your external monitor and
          suddenly you are typing on the other computer. Tandem avoids it by
          only switching at the <strong>outer boundary</strong> of your
          whole display arrangement. A seam between two of your own monitors
          never switches - including L-shaped and stacked arrangements.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tandem/edges.svg"
          alt="A multi-monitor arrangement showing that seams between your own monitors never switch machines; only the outer edge of the whole arrangement does"
          className="w-full"
        />

        <p>
          Two more details make switching feel deliberate rather than
          jumpy. The cursor must rest at the edge briefly (50 ms,
          continuously observed) - grazing the edge in passing does
          nothing. And when the switch happens, the cursor enters the other
          machine at the matching height it left from; if that spot falls in
          a gap of the monitor arrangement where there is no screen, it is
          nudged onto the nearest real display, so the cursor never
          disappears. Movement crosses the wire as relative deltas rather
          than absolute positions, so different resolutions and layouts
          compose naturally.
        </p>

        <h3>Chains: three or more Macs</h3>

        <p>
          With three or more Macs, each machine knows only its immediate
          neighbors - there is no coordinator. When the remote cursor
          reaches a controlled machine&apos;s far edge, that machine
          requests control of its own next neighbor, hands the cursor over,
          and drops into RELAYING - forwarding the controller&apos;s input
          verbatim. The controller never needs to know how long the chain
          is.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tandem/chain.svg"
          alt="A three-machine chain: the left machine controlling, the middle machine relaying, the right machine controlled"
          className="w-full"
        />

        <p>
          Failure handling favors the person at the keyboard. If a middle
          machine disappears, the rest are told the session is over, each
          returns to controlling itself, and any keys held down remotely are
          released. If the end machine disappears, the cursor falls back
          onto the relay&apos;s screen and the session continues. The
          clipboard travels the chain hop by hop, and each machine remembers
          a fingerprint (hash) of the last content it saw - so the same copy
          never bounces between machines forever.
        </p>

        <h3>Finding each other - and staying found</h3>

        <p>
          This is the part that fixes my original complaint. Machines
          announce themselves on the local network over{" "}
          <a
            href="https://en.wikipedia.org/wiki/Bonjour_(software)"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bonjour
          </a>{" "}
          (mDNS, Apple&apos;s zero-configuration discovery protocol), tagged
          with
          an id unique to that run - so even two machines with the same
          hostname are told apart. No IPs to configure, no server to run.
          If your network blocks mDNS, <code>--connect host</code> dials the
          peer directly instead.
        </p>

        <p>
          Because both sides discover each other at the same time, both
          could connect at once and each reject the other&apos;s attempt -
          a race called connection glare. The tiebreak is deterministic:
          the smaller instance id initiates, the other waits. The same
          tiebreak resolves the race when both cursors hit their edges in
          the same instant, so a pair can never end up mutually controlled.
        </p>

        <p>
          And the important one: <strong>reconnection is automatic</strong>.
          After sleep, a network blip, or a restart, a backoff loop retries
          the last known peer while fresh mDNS announcements race it -
          whichever succeeds first wins. No user action, no toggling
          settings, no reboot.
        </p>

        <h3>Pairing and encryption</h3>

        <p>
          Trust is established once, with a 6-digit code shown on one screen
          and typed on the other. The code never crosses the network - so a
          machine you <em>can&apos;t see</em> can never complete a pairing.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tandem/pairing.svg"
          alt="Pairing and session key derivation: a one-time code establishes a pairing key, and every connection derives fresh per-direction session keys from it"
          className="w-full"
        />

        <p>
          Every connection after that authenticates automatically: the peer
          proves it still holds the pairing key through an{" "}
          <a
            href="https://en.wikipedia.org/wiki/HMAC"
            target="_blank"
            rel="noopener noreferrer"
          >
            HMAC
          </a>{" "}
          challenge-response (a cryptographic proof of knowing a secret
          without sending it) with a fresh nonce, verified in constant time.
          Both sides then derive fresh session keys - one per direction -
          and everything that follows is encrypted and authenticated with{" "}
          <a
            href="https://en.wikipedia.org/wiki/ChaCha20-Poly1305"
            target="_blank"
            rel="noopener noreferrer"
          >
            ChaCha20-Poly1305
          </a>
          , a modern authenticated cipher.
        </p>

        <p>
          Stale pairings heal themselves. If one machine was reinstalled, it
          answers &ldquo;I don&apos;t know you&rdquo;, the stale side
          discards its saved entry, and a fresh pairing code appears on the
          same connection - no manual cleanup on either machine.
        </p>

        <h3>On the wire</h3>

        <p>
          The protocol is length-prefixed binary frames over TCP (with{" "}
          <code>TCP_NODELAY</code> for latency). Plaintext exists only
          during the handshake; the moment authentication succeeds, framing
          switches to the sealed, encrypted form and never goes back.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tandem/framing.svg"
          alt="Plaintext and encrypted frame formats: length-prefixed frames, sealed with ChaCha20-Poly1305 after the handshake"
          className="w-full"
        />

        <p>
          A frame that fails its authentication check drops the connection
          immediately - the channel never limps along after tampering. And
          the very first message carries the protocol version and the
          sender&apos;s direction, so an incompatible version - or two
          machines pointing the same way - is reported clearly at connect
          time instead of failing strangely later.
        </p>

        <h3>No stuck keys, no lost scrolls</h3>

        <p>
          The rule Tandem holds itself to: no failure may ever leave stuck
          keys or a hidden cursor behind. A few of the details in service of
          that:
        </p>

        <ul>
          <li>
            <strong>Keepalive that costs nothing during use.</strong> A ping
            is sent only after 2 seconds of complete silence - forwarded
            input already proves the connection is alive. Six seconds of no
            traffic tears the connection down.
          </li>
          <li>
            <strong>Force-release on every exit.</strong> The controlled
            side tracks every held button, key, and modifier, and releases
            them on disconnect or shutdown.
          </li>
          <li>
            <strong>Drags never tear.</strong> Switching is suppressed while
            a mouse button is down, so a file drop cannot be ripped across
            machines mid-flight.
          </li>
          <li>
            <strong>Clipboard without re-sends.</strong> Content is read,
            hashed, and sent only when it genuinely changed - switching back
            and forth never re-transfers a 10 MB screenshot. Text and images
            sync; transfers cap at 10 MB.
          </li>
          <li>
            <strong>Slow scrolling still works.</strong> A trackpad scrolled
            gently sends movements smaller than one pixel (like 0.3 at a
            time). Instead of rounding each one down to zero, Tandem adds
            the fractions up and scrolls once they reach a whole pixel.
          </li>
        </ul>

        <h2>Security Limitations</h2>

        <p>
          The 6-digit code is low-entropy: it is used once and never sent over
          the network, but an attacker who records the very first pairing
          handshake could brute-force it offline (key stretching slows this
          down) - so pair on a network you trust. There is no forward
          secrecy: someone who steals the saved pairing file can decrypt
          recorded past sessions of that pairing; <code>tandem unpair</code>{" "}
          and re-pairing rotates the secret. And a malicious device on your
          network can trigger a pairing <em>prompt</em> by advertising your
          peer&apos;s hostname, but cannot complete it without the code from
          your screen - never type a code that isn&apos;t displayed on your
          own Mac.
        </p>

        <h2>Try It</h2>

        <p>
          Tandem is beta software, macOS-only, and needs Python 3.11+ and
          the Accessibility permission for your terminal:
        </p>

        <CodeBlock
          code={`pipx install tandem-kvm
tandem doctor
tandem --direction right   # and --direction left on the other Mac`}
        />

        <p>
          The code, usage guide, and full architecture doc are on{" "}
          <a
            href="https://github.com/visakhunnikrishnan/Tandem"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          , and the package is{" "}
          <a
            href="https://pypi.org/project/tandem-kvm/"
            target="_blank"
            rel="noopener noreferrer"
          >
            tandem-kvm on PyPI
          </a>
          . If Universal Control has ever silently abandoned you mid-workday,
          give it a try - and if something breaks, <code>tandem doctor</code>{" "}
          and the logs will actually tell you why.
        </p>

      </div>

      <RelatedPosts slug="tandem" />
    </article>
  );
}
