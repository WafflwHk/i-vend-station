import { highlights } from "../data/highlights";
import HighlightCard from "./HighlightCard";
import styles from "./latest-ivend.module.css";

export default function LatestIvend() {
  if (!highlights.length) return null;
  return <section id="latest" className={styles.section} aria-labelledby="latest-ivend-title">
    <div className={styles.heading}>
      <div><div className="section-index">06 — IVEND UPDATES</div><h2 id="latest-ivend-title">Latest from IVEND</h2></div>
      {highlights.every((highlight) => highlight.sample) && <p>Preview content. Official updates will be added here.</p>}
    </div>
    <p id="ivend-updates-help" className={styles.hint}>Swipe or scroll to explore <span aria-hidden="true">→</span></p>
    {/* Focusable overflow region enables native arrow-key scrolling without JavaScript. */}
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
    <div className={styles.rail} role="region" aria-label="IVEND updates" aria-describedby="ivend-updates-help" tabIndex={0}>
      {highlights.map((highlight) => <HighlightCard key={highlight.id} highlight={highlight} />)}
    </div>
  </section>;
}
