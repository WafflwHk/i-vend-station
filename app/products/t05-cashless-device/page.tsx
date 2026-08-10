import type { Metadata } from "next";
import Link from "next/link";
import styles from "./product.module.css";

export const metadata: Metadata = {
  title: "T05 Cashless Payment Device | I Vend Station",
  description:
    "Explore the T05 cashless payment device for compatible vending machines, with card, contactless, QR, and operator reporting capabilities.",
  openGraph: {
    title: "T05 Cashless | I Vend Station",
    description: "A simpler way to bring cashless payments to compatible vending machines.",
    images: [
      {
        url: "/og-t05-cashless.png",
        width: 1536,
        height: 1024,
        alt: "Orange cashless payment terminal on a dark background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "T05 Cashless | I Vend Station",
    description: "Tap, scan, and pay at compatible vending machines.",
    images: ["/og-t05-cashless.png"],
  },
};

const paymentOptions = ["Contactless", "Card", "QR payment", "E-wallet"];

const operatorTools = [
  {
    number: "01",
    title: "Transaction records",
    copy: "Keep supported terminal activity together so sales are easier to review.",
  },
  {
    number: "02",
    title: "Search and reporting",
    copy: "Look up transactions and access available daily or monthly reports from the operator tools.",
  },
  {
    number: "03",
    title: "Connected processing",
    copy: "Use an active Wi-Fi or 4G connection, depending on the approved terminal configuration.",
  },
];

export default function T05CashlessPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.globalNav} aria-label="I Vend Station navigation">
        <Link className={styles.brand} href="/" aria-label="I Vend Station home">
          <span className={styles.brandMark}>I</span>
          <span>I Vend Station</span>
        </Link>
        <div className={styles.globalLinks}>
          <Link href="/#machines">Machines</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </nav>

      <div className={styles.productNav}>
        <div>
          <span>T05</span>
          <small>Cashless payment device</small>
        </div>
        <div className={styles.productLinks}>
          <a href="#overview">Overview</a>
          <a href="#features">Features</a>
          <a href="#compatibility">Compatibility</a>
          <a className={styles.quotePill} href="#quote">Request a quote</a>
        </div>
      </div>

      <section className={styles.hero} id="overview">
        <div className={styles.heroGlow} />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>T05 FOR VENDING</p>
          <h1>Cashless,<br />made effortless.</h1>
          <p className={styles.heroIntro}>
            Give customers a faster way to pay at compatible vending machines&mdash;with contactless cards and supported QR or e-wallet methods.
          </p>
          <a className={styles.primaryButton} href="#quote">
            Check compatibility <span aria-hidden="true">&darr;</span>
          </a>
        </div>
        <div className={styles.deviceStage} aria-label="T05 cashless payment terminal">
          <div className={styles.signalRing} />
          <div className={`${styles.signalRing} ${styles.signalRingTwo}`} />
          <img src="/t05-terminal.png" alt="Orange T05 cashless payment terminal" />
          <span className={styles.deviceNote}>Terminal configuration shown for illustration.</span>
        </div>
        <div className={styles.scrollCue}><span>Scroll to explore</span><i /></div>
      </section>

      <section className={styles.paymentBand} aria-label="Supported payment categories">
        <p>One device. More ways to pay.</p>
        <div>
          {paymentOptions.map((option) => <span key={option}>{option}</span>)}
        </div>
        <small>Available payment brands depend on region, merchant approval, and terminal setup.</small>
      </section>

      <section className={styles.tapStory}>
        <div className={styles.stickyCopy}>
          <p className={styles.sectionLabel}>A BETTER CHECKOUT</p>
          <h2>Tap.<br />Scan.<br />Done.</h2>
          <p>
            A clear payment flow helps customers buy without searching for exact change. The terminal handles the supported digital payment while the compatible vending machine completes the sale.
          </p>
        </div>
        <div className={styles.storyCards}>
          <article className={styles.storyCard}>
            <div className={styles.nfcVisual} aria-hidden="true"><span /><span /><span /><i /></div>
            <small>CONTACTLESS</small>
            <h3>Built for the tap.</h3>
            <p>Accept supported NFC and IC-chip card payments through an approved setup.</p>
          </article>
          <article className={`${styles.storyCard} ${styles.storyCardBlue}`}>
            <div className={styles.qrVisual} aria-hidden="true">
              {Array.from({ length: 25 }).map((_, index) => <i key={index} />)}
            </div>
            <small>QR &amp; E-WALLET</small>
            <h3>Ready for the scan.</h3>
            <p>Offer supported QR and e-wallet methods configured for your market and merchant account.</p>
          </article>
        </div>
      </section>

      <section className={styles.controlSection} id="features">
        <div className={styles.controlHeadline}>
          <p className={styles.sectionLabel}>OPERATOR VIEW</p>
          <h2>Sales visibility,<br />without the guesswork.</h2>
          <p>
            Approved T05 operator tools can centralise transaction records and reporting, helping you review payment activity away from the machine.
          </p>
        </div>
        <div className={styles.dashboard} aria-label="Illustrative transaction dashboard">
          <div className={styles.dashboardTop}><span>I Vend Station</span><div /></div>
          <div className={styles.dashboardBody}>
            <aside><i className={styles.active} /><i /><i /><i /></aside>
            <div className={styles.dashboardContent}>
              <p>TRANSACTIONS</p>
              <div className={styles.summaryRow}>
                <div><small>STATUS</small><strong>Connected</strong></div>
                <div><small>ACTIVITY</small><strong>Updated</strong></div>
              </div>
              <div className={styles.chart}>
                {[35, 58, 43, 73, 64, 86, 76].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className={styles.rows}><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <div className={styles.toolGrid}>
          {operatorTools.map((tool) => (
            <article key={tool.number}>
              <span>{tool.number}</span><h3>{tool.title}</h3><p>{tool.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.compatibility} id="compatibility">
        <div className={styles.compatibilityCopy}>
          <p className={styles.sectionLabel}>COMPATIBILITY FIRST</p>
          <h2>The right connection matters.</h2>
          <p>
            Cashless integration is not one-size-fits-all. We first check the machine controller, available interface, network, and merchant requirements before confirming a solution.
          </p>
        </div>
        <div className={styles.connectionMap} aria-label="Machine compatibility check diagram">
          <div className={styles.mapNode}><span>01</span><strong>Vending machine</strong><small>Model and controller</small></div>
          <i className={styles.mapLine} />
          <div className={`${styles.mapNode} ${styles.mapNodeMain}`}><span>02</span><strong>Interface check</strong><small>MDB or approved connection</small></div>
          <i className={styles.mapLine} />
          <div className={styles.mapNode}><span>03</span><strong>T05 setup</strong><small>Network and merchant approval</small></div>
        </div>
        <p className={styles.compatibilityNote}>
          Connectivity may include Wi-Fi, 4G, MDB, or another supported interface. Final availability depends on the exact terminal and vending-machine configuration.
        </p>
      </section>

      <section className={styles.quote} id="quote">
        <div className={styles.quoteAura} />
        <p className={styles.sectionLabel}>T05 CASHLESS</p>
        <h2>Make your next machine<br />easier to pay at.</h2>
        <p>Send us your vending-machine model and location. We&apos;ll confirm the setup before preparing your quotation.</p>
        <a href="mailto:hello@example.com?subject=T05 cashless compatibility and quotation">
          Request a T05 quotation <span aria-hidden="true">&nearr;</span>
        </a>
        <small>Replace the email address with your business contact when ready.</small>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/"><span className={styles.brandMark}>I</span><span>I Vend Station</span></Link>
        <p>Vending machines and cashless payment equipment.</p>
        <div><span>&copy; 2026 I Vend Station</span><small>Payment availability and compatibility are subject to confirmation.</small></div>
      </footer>
    </main>
  );
}
