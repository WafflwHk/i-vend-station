import type { Machine } from "../data/machines";
import MachineArt from "./MachineArt";
import { IVENDLinkButton } from "./IVENDButton";
import styles from "./machine-card.module.css";

type Props = {
  machine: Machine;
  index: number;
};

export default function MachineCard({ machine, index }: Props) {
  return (
    <article className={`machine-card ${machine.featured ? "featured" : ""} ${styles.card}`} data-animate="up" data-animate-delay={String(index % 3)}>
      <div className="card-top"><span>{machine.type}</span><small>{String(index + 1).padStart(2, "0")}</small></div>
      <div className="card-art">
        {machine.image ? <img className="machine-photo" src={machine.image} width="1024" height="1536" loading="lazy" decoding="async" alt={machine.imageAlt ?? machine.name} /> : <><MachineArt kind={machine.art} /><span className={styles.preview}>Illustrative preview</span></>}
      </div>
      <div className="card-copy">
        <div className="model-line">
          <div className="model-code">{machine.code}</div>
          {machine.comingSoon ? <span className="availability-badge">Coming Soon</span> : null}
        </div>
        <h3>{machine.name}</h3>
        <p>{machine.copy}</p>
        <div className="card-bottom card-actions">
          <IVENDLinkButton className="view-machine-button" href={`/machines/${machine.slug}`}>View machine <span aria-hidden="true">&rarr;</span></IVENDLinkButton>
          {machine.comingSoon && <span className="coming-soon-action" aria-label={`${machine.code} is coming soon`}>Coming soon</span>}
        </div>
      </div>
    </article>
  );
}
