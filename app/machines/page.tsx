import type { Metadata } from "next";
import MachineCard from "../components/MachineCard";
import SiteFooter from "../components/SiteFooter";
import { machines } from "../data/machines";

export const metadata: Metadata = {
  title: "Vending Machines | I Vend Station",
  description: "Explore Japanese coffee and TCN vending machines, then open an interactive illustrative 360 degree view for each model.",
};

export default function MachinesPage() {
  return (
    <main className="collection-page">
      <section className="collection-hero">
        <div className="section-index" data-animate="up">MACHINE COLLECTION</div>
        <h1 data-animate="up" data-animate-delay="1">Find your<br /><em>vending machine.</em></h1>
        <div className="collection-hero-foot" data-animate="up" data-animate-delay="2"><p>Compare the current range, open any machine for a rotatable front, side, and rear view, then request the exact configuration.</p><span>07 machine types</span></div>
      </section>

      <section className="collection-list" aria-labelledby="machine-list-title">
        <div className="collection-heading" data-animate="up"><div><div className="section-index">ALL MACHINES</div><h2 id="machine-list-title">Choose a model.</h2></div><p>Every 360&deg; view is clearly marked as illustrative until exact angle photographs are supplied.</p></div>
        <div className="machine-grid collection-grid">{machines.map((machine, index) => <MachineCard machine={machine} index={index} key={machine.slug} />)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
