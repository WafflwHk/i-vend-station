import type { Highlight } from "../data/highlights";
import styles from "./latest-ivend.module.css";

export default function HighlightCard({ highlight }: { highlight: Highlight }) {
  return <article className={styles.card}>
    <div className={styles.visual}>
      <img src={highlight.image} alt={highlight.imageAlt} width="640" height="640" loading="lazy" decoding="async" />
      {highlight.sample && <span className={styles.sample}>Sample · Not an announcement</span>}
    </div>
    <div className={styles.copy}>
      <div className={styles.meta}><span>{highlight.category}</span>{highlight.date && <time dateTime={highlight.date}>{highlight.date}</time>}</div>
      <h3>{highlight.title}</h3>
      <p>{highlight.description}</p>
      {highlight.href && <a href={highlight.href}>{highlight.linkLabel ?? "Learn more"}<span aria-hidden="true">→</span></a>}
    </div>
  </article>;
}
