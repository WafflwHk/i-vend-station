import type { Metadata } from "next";
import MachineCard from "../components/MachineCard";
import RequestQuoteLink from "../components/RequestQuoteLink";
import SiteFooter from "../components/SiteFooter";
import T05PhotoViewer from "../components/T05PhotoViewer";
import { catalogueMachines } from "../data/machines";

export const metadata: Metadata = {
  title: "Store | I Vend Station",
  description: "Browse vending machines and the T05 cashless device from I Vend Station. Request quotations for confirmed configurations.",
};

export default function StorePage() {
  return (
    <main className="collection-page store-page">
      <section className="collection-hero store-hero">
        <div className="section-index" data-animate="up">I VEND STATION STORE</div>
        <h1 data-animate="up" data-animate-delay="1">Machines and<br /><em>modern payments.</em></h1>
        <div className="collection-hero-foot" data-animate="up" data-animate-delay="2"><p>Browse the vending range and cashless device. Prices stay quotation-based so the exact machine, location, and payment setup can be checked first.</p><a href="/#contact">Request a quotation <span aria-hidden="true">&#8599;</span></a></div>
      </section>

      <section className="store-feature" aria-labelledby="cashless-store-title">
        <div className="store-feature-visual" data-animate="left"><div className="store-orbit" /><T05PhotoViewer className="store-t05-viewer" /></div>
        <div className="store-feature-copy" data-animate="right"><div className="section-index light">CASHLESS DEVICE</div><span className="store-t05">T05</span><h2 id="cashless-store-title">A cashless option for compatible machines.</h2><p>Explore supported contactless and QR payment capabilities, operator records, connectivity requirements, and the compatibility check.</p><a href="/products/t05-cashless-device">View cashless device <span aria-hidden="true">&rarr;</span></a><RequestQuoteLink code="T05" name="Cashless Device" context="cashless" variant="light" className="store-quote-button" /><small>Available methods depend on the machine, merchant setup, and region.</small></div>
      </section>

      <section className="collection-list" aria-labelledby="store-machine-title">
        <div className="collection-heading" data-animate="up"><div><div className="section-index">VENDING MACHINES</div><h2 id="store-machine-title">Shop the range.</h2></div><a className="collection-link" href="/machines">See all machine details <span aria-hidden="true">&rarr;</span></a></div>
        <div className="machine-grid collection-grid">{catalogueMachines.map((machine, index) => <MachineCard machine={machine} index={index} key={machine.slug} />)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
