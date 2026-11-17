import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import { getMachine, machines, catalogueMachines } from "../../data/machines";
import { createWhatsAppQuoteHref } from "../../lib/whatsapp";
import styles from "./machine-detail.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return machines.map((machine) => ({ slug: machine.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) return {};
  return {
    title: `${machine.name} | I Vend Station`,
    description: `${machine.copy} Review the machine details and request a quotation.`,
  };
}

export default async function MachineDetailPage({ params }: Props) {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) notFound();

  const index = catalogueMachines.findIndex((item) => item.slug === machine.slug);
  const nextMachine = catalogueMachines[(index + 1) % catalogueMachines.length];
  const quoteHref = createWhatsAppQuoteHref({ code: machine.code, name: machine.name });

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb} data-animate="up"><a href="/machines">Machines</a><span>/</span><span>{machine.code}</span></div>

      <section className={styles.intro}>
        <div className={styles.introCopy} data-animate="left">
          <p>{machine.type}</p>
          <h1>{machine.name}</h1>
          <span className={styles.modelCode}>{machine.code}</span>
          <p className={styles.summary}>{machine.description}</p>
          <a className={styles.introLink} href={machine.specifications ? "#specifications-title" : "#machine-overview"}>Explore the details <span aria-hidden="true">↓</span></a>
        </div>
        <figure className={styles.productPortrait}>
          {machine.image ? <img src={machine.image} width="1024" height="1536" fetchPriority="high" alt={machine.imageAlt ?? machine.name} /> : <div className={styles.portraitPlaceholder}><span>COMING SOON</span><strong>{machine.code}</strong><p>Product photography will be added when the unit is confirmed.</p></div>}
          {machine.image ? <figcaption>Actual machine photograph</figcaption> : null}
        </figure>
      </section>

      <section id="machine-overview" className={styles.details}>
        <div data-animate="left">
          <p className={styles.label}>MACHINE OVERVIEW</p>
          <h2>Plan the right setup.</h2>
          <p>{machine.copy} Prices, technical specifications, internal configuration, and model availability are confirmed before purchase.</p>
        </div>
        <ol data-animate="right">
          {machine.highlights.map((highlight, itemIndex) => <li key={highlight} data-animate="up" data-animate-delay={String(itemIndex)}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{highlight}</li>)}
        </ol>
      </section>

      {machine.specifications ? (
        <section className={styles.specifications} aria-labelledby="specifications-title">
          <div className={styles.specificationIntro} data-animate="left">
            <p className={styles.label}>MACHINE SPECIFICATIONS</p>
            <h2 id="specifications-title">Designed for a complete coffee service.</h2>
            <p>Specification details supplied for this Fuji coffee machine. Confirm final configuration with IVEND before purchase.</p>
          </div>
          <figure className={styles.specificationVisual}>
            <img src="/coffee-machine-wireframe-transparent.png" width="941" height="1672" alt="Illustrative glowing white wireframe of an open vending machine cabinet" loading="lazy" decoding="async" />
          </figure>
          <dl className={styles.specificationGrid}>
            {machine.specifications.map((specification, index) => (
              <div key={specification.label} data-animate="up" data-animate-delay={String(index % 3)}>
                <dt>{specification.label}</dt>
                <dd>{specification.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {machine.productHighlights ? (
        <section className={styles.productHighlights} aria-labelledby="product-highlights-title">
          <div className={styles.productHighlightsIntro} data-animate="left">
            <p className={styles.label}>FUJI COFFEE MACHINE</p>
            <h2 id="product-highlights-title">PRODUCT HIGHLIGHTS</h2>
            <p>Key service, capacity, and configuration benefits supplied for this hot-and-cold coffee machine.</p>
          </div>
          <ol className={styles.productHighlightGrid}>
            {machine.productHighlights.map((highlight, itemIndex) => (
              <li key={highlight.title} data-animate="up" data-animate-delay={String(itemIndex % 3)}>
                <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : machine.image ? (
        <section className={styles.actualPhoto}>
          <div data-animate="left"><p className={styles.label}>PRODUCT PHOTOGRAPHY</p><h2>See the actual unit.</h2><p>Review the supplied machine photo. Contact IVEND to confirm availability and request additional views of the exact unit.</p></div>
          <figure data-animate="right"><img src={machine.image} loading="lazy" decoding="async" alt={machine.imageAlt ?? machine.name} /><figcaption>Actual machine photograph supplied by I Vend Station.</figcaption></figure>
        </section>
      ) : (
        <section className={styles.photoNotice} data-animate="scale"><p className={styles.label}>PRODUCT PHOTOS</p><h2>Product views to follow.</h2><p>Contact IVEND for current unit availability, configuration, and photography.</p></section>
      )}

      <section className={styles.quote} data-animate="scale" data-glass-theme="dark">
        <div data-animate="left"><p className={styles.label}>REQUEST A QUOTATION</p><h2>Ask about {machine.code}.</h2><p>Send this model to our WhatsApp team to confirm the exact unit, configuration, availability, and quotation.</p></div>
        <div className={styles.quoteActions} data-animate="right">
          <a href={quoteHref} data-glass="accent" target="_blank" rel="noopener noreferrer" aria-label={`Request a quotation for ${machine.code} via WhatsApp (opens in a new tab)`}>Request a Quote <span aria-hidden="true">&#8599;</span></a>
        </div>
      </section>

      <a className={styles.nextMachine} href={`/machines/${nextMachine.slug}`} data-animate="up"><span>Next machine</span><strong>{nextMachine.name}</strong><i data-glass="indicator" aria-hidden="true">&rarr;</i></a>
      <SiteFooter />
    </main>
  );
}
