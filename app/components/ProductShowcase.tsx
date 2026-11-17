import { machines } from "../data/machines";
import RequestQuoteLink from "./RequestQuoteLink";
import ProductShowcaseMotion from "./ProductShowcaseMotion";
import styles from "./product-showcase.module.css";

export default function ProductShowcase() {
  const machine = machines.find((item) => item.slug === "hot-cold-coffee-machine");
  if (!machine?.specifications) return null;

  const specifications = [machine.specifications[0], machine.specifications[2], machine.specifications[4]];

  return (
    <section id="product-showcase" className={styles.showcase} aria-labelledby="product-showcase-title">
      <ProductShowcaseMotion />
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>PRODUCT STUDY / JAPAN SERIES</p>
          <h2 id="product-showcase-title">A closer look.</h2>
        </div>
        <div className={styles.introduction}>
          <p>From the cabinet to the details that matter. Explore the Fuji hot-and-cold coffee machine.</p>
          <a className={styles.skip} href="#machine-range">Skip to all machines <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      <div className={styles.viewport} data-showcase-viewport>
        <article className={styles.scene} data-showcase-scene>
          <p className={styles.sceneNumber}>01 <span>THE CABINET</span></p>
          <figure className={styles.visual}>
            <img src="/hot-cold-coffee-machine-cutout.png" width="1023" height="1537" loading="lazy" decoding="async" alt="Front of the actual white Fuji hot-and-cold coffee vending machine" />
          </figure>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>FUJI COFFEE MACHINE</p>
            <h3>One cabinet.<br />More possibilities.</h3>
            <p>A hot-and-cold coffee selection, presented in one Japanese-style vending machine.</p>
            <small>Actual product photograph. Configuration and availability are confirmed with IVEND.</small>
          </div>
        </article>

        <article className={styles.scene} data-showcase-scene>
          <p className={styles.sceneNumber}>02 <span>BEHIND THE FRONT</span></p>
          <figure className={`${styles.visual} ${styles.interior}`}>
            <img src="/coffee-machine-neon-blueprint.png" width="941" height="1672" loading="lazy" decoding="async" alt="Illustrative white-line study of an open vending cabinet and its internal components, not an exact view of the supplied Fuji unit" />
            <figcaption>Illustrative interior · Prototype</figcaption>
          </figure>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>AN INTERIOR STUDY</p>
            <h3>Look beyond<br />the exterior.</h3>
            <p>The next view explores the idea of an open cabinet and its internal mechanisms.</p>
            <small>This is illustrative artwork, not a physically accurate door-opening sequence. Exact internal layout must be confirmed for the supplied unit.</small>
          </div>
        </article>

        <article className={styles.scene} data-showcase-scene>
          <p className={styles.sceneNumber}>03 <span>THE DETAILS</span></p>
          <figure className={styles.visual}>
            <img src="/hot-cold-coffee-machine-cutout.png" width="1023" height="1537" loading="lazy" decoding="async" alt="Fuji coffee vending machine shown beside the supplied specifications" />
          </figure>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>SUPPLIED SPECIFICATIONS</p>
            <h3>Plan for<br />your location.</h3>
            <dl className={styles.specifications}>
              {specifications.map((specification) => <div key={specification.label}><dt>{specification.label}</dt><dd>{specification.value}</dd></div>)}
            </dl>
            <small>Confirm the final setup, technical details, and exact available unit before purchase.</small>
          </div>
        </article>

        <div className={styles.progress} aria-hidden="true">
          <div className={styles.progressTrack}><i data-showcase-progress /></div>
          <span>01 — Cabinet</span><span>02 — Interior study</span><span>03 — Specifications</span>
        </div>
      </div>

      <div className={styles.finish}>
        <div><p className={styles.eyebrow}>YOUR NEXT STEP</p><h3>Explore the right setup.</h3><p>Review the full product information, or talk to IVEND about your location and requirements.</p></div>
        <div className={styles.actions}>
          <a className={styles.detailsLink} data-glass="neutral" href="/machines/hot-cold-coffee-machine">View product details <span aria-hidden="true">↗</span></a>
          <RequestQuoteLink code={machine.code} name={machine.name} />
        </div>
      </div>
    </section>
  );
}
