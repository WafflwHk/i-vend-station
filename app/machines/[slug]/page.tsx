import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MachineViewer from "../../components/MachineViewer";
import SiteFooter from "../../components/SiteFooter";
import { getMachine, machines } from "../../data/machines";
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
    description: `${machine.copy} Explore an illustrative 360 degree view and request a quotation.`,
  };
}

export default async function MachineDetailPage({ params }: Props) {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) notFound();

  const index = machines.findIndex((item) => item.slug === machine.slug);
  const nextMachine = machines[(index + 1) % machines.length];

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb} data-animate="up"><a href="/machines">Machines</a><span>/</span><span>{machine.code}</span></div>

      <section className={styles.intro}>
        <div className={styles.introCopy} data-animate="left">
          <p>{machine.type}</p>
          <h1>{machine.name}</h1>
          <span className={styles.modelCode}>{machine.code}</span>
        </div>
        <p className={styles.summary} data-animate="right">{machine.description}</p>
      </section>

      <MachineViewer machine={machine} />

      <section className={styles.details}>
        <div data-animate="left">
          <p className={styles.label}>MACHINE OVERVIEW</p>
          <h2>Plan the right setup.</h2>
          <p>{machine.copy} Prices, technical specifications, internal configuration, and model availability are confirmed before purchase.</p>
        </div>
        <ol data-animate="right">
          {machine.highlights.map((highlight, itemIndex) => <li key={highlight} data-animate="up" data-animate-delay={String(itemIndex)}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{highlight}</li>)}
        </ol>
      </section>

      {machine.image ? (
        <section className={styles.actualPhoto}>
          <div data-animate="left"><p className={styles.label}>ACTUAL UNIT PHOTO</p><h2>The machine you supplied.</h2><p>This is the real photo currently provided for this listing. Add front, right, rear, and left photos later to replace the illustrative angles above.</p></div>
          <figure data-animate="right"><img src={machine.image} loading="lazy" decoding="async" alt={machine.imageAlt ?? machine.name} /><figcaption>Actual machine photograph supplied by I Vend Station.</figcaption></figure>
        </section>
      ) : (
        <section className={styles.photoNotice} data-animate="scale"><p className={styles.label}>PRODUCT PHOTOS</p><h2>Ready for your exact machine photos.</h2><p>The 360&deg; model above is illustrative. When you provide real front, right, rear, and left photographs, they can be added here for a more exact customer view.</p></section>
      )}

      <section className={styles.quote} data-animate="scale">
        <div data-animate="left"><p className={styles.label}>REQUEST A QUOTATION</p><h2>Ask about {machine.code}.</h2><p>Send your location, product type, and preferred payment setup so the exact configuration can be checked.</p></div>
        <a href={`mailto:hello@example.com?subject=Quotation request: ${encodeURIComponent(machine.code)}`}>Request quotation <span aria-hidden="true">&#8599;</span></a>
      </section>

      <a className={styles.nextMachine} href={`/machines/${nextMachine.slug}`} data-animate="up"><span>Next machine</span><strong>{nextMachine.name}</strong><i aria-hidden="true">&rarr;</i></a>
      <SiteFooter />
    </main>
  );
}
