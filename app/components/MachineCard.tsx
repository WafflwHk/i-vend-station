import Link from "next/link";
import type { Machine } from "../data/machines";
import MachineArt from "./MachineArt";

type Props = {
  machine: Machine;
  index: number;
};

export default function MachineCard({ machine, index }: Props) {
  return (
    <article className={`machine-card ${machine.featured ? "featured" : ""}`}>
      <div className="card-top"><span>{machine.type}</span><small>{String(index + 1).padStart(2, "0")}</small></div>
      <div className="card-art">
        <div className="card-glow" />
        {machine.image ? <img className="machine-photo" src={machine.image} alt={machine.imageAlt ?? machine.name} /> : <MachineArt kind={machine.art} />}
      </div>
      <div className="card-copy">
        <div className="model-code">{machine.code}</div>
        <h3>{machine.name}</h3>
        <p>{machine.copy}</p>
        <div className="card-bottom card-actions">
          <Link className="view-machine-button" href={`/machines/${machine.slug}`}>View machine <span aria-hidden="true">&rarr;</span></Link>
          <a className="quote-icon" href={`mailto:hello@example.com?subject=Enquiry: ${encodeURIComponent(machine.code)}`} aria-label={`Request a quotation for ${machine.name}`} title="Request a quotation">&nearr;</a>
        </div>
      </div>
    </article>
  );
}
