import type { Machine } from "../data/machines";
import AddToCartButton from "./AddToCartButton";
import MachineArt from "./MachineArt";

type Props = {
  machine: Machine;
  index: number;
};

export default function MachineCard({ machine, index }: Props) {
  return (
    <article className={`machine-card ${machine.featured ? "featured" : ""}`} data-animate="up" data-animate-delay={String(index % 3)}>
      <div className="card-top"><span>{machine.type}</span><small>{String(index + 1).padStart(2, "0")}</small></div>
      <div className="card-art">
        <div className="card-glow" />
        {machine.image ? <img className="machine-photo" src={machine.image} loading="lazy" decoding="async" alt={machine.imageAlt ?? machine.name} /> : <MachineArt kind={machine.art} />}
      </div>
      <div className="card-copy">
        <div className="model-code">{machine.code}</div>
        <h3>{machine.name}</h3>
        <p>{machine.copy}</p>
        <div className="card-bottom card-actions">
          <a className="view-machine-button" href={`/machines/${machine.slug}`}>View machine <span aria-hidden="true">&rarr;</span></a>
          <AddToCartButton productId={machine.slug} variant="compact" />
        </div>
      </div>
    </article>
  );
}
