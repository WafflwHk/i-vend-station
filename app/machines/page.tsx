import type { Metadata } from "next";
import MachineCard from "../components/MachineCard";
import SiteFooter from "../components/SiteFooter";
import ProductShowcase from "../components/ProductShowcase";
import { catalogueMachines } from "../data/machines";

export const metadata: Metadata = {
  title: "Vending Machines | I Vend Station",
  description: "Explore Japanese coffee and TCN vending machines, review their product details, and request a quotation.",
};

export default function MachinesPage() {
  return (
    <main className="collection-page premium-catalogue premium-page">
      <section className="premium-catalogue-intro" aria-labelledby="catalog-title">
        <p className="premium-eyebrow">IVEND / PRODUCT CATALOG</p>
        <h1 id="catalog-title">Consider every detail.</h1>
        <div><p>Explore the machines. Look beneath the surface. Find the right format for your location.</p><a className="premium-text-link" href="#machine-range">Browse {catalogueMachines.length} machines <span aria-hidden="true">↓</span></a></div>
      </section>

      <ProductShowcase />

      <section id="machine-range" className="collection-list" aria-labelledby="machine-list-title">
        <div className="collection-heading" data-animate="up"><div><div className="section-index">ALL MACHINES</div><h2 id="machine-list-title">Choose a model.</h2></div><p>Product details and availability are confirmed directly with IVEND before quotation.</p></div>
        <div className="machine-grid collection-grid">{catalogueMachines.map((machine, index) => <MachineCard machine={machine} index={index} key={machine.slug} />)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
