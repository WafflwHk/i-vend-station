import MachineCard from "./components/MachineCard";
import SiteFooter from "./components/SiteFooter";
import LatestIvend from "./components/LatestIvend";
import { IVENDLinkButton } from "./components/IVENDButton";
import { catalogueMachines } from "./data/machines";
import { createWhatsAppQuoteHref } from "./lib/whatsapp";

const whatsappHref = createWhatsAppQuoteHref();

const faqs = [
  {
    question: "What vending machines do you sell?",
    answer: "The current catalogue includes a Japanese hot-and-cold coffee machine and TCN standard-capacity and classic vending formats.",
  },
  {
    question: "Are prices displayed online?",
    answer: "Not yet. Prices stay quotation-based so the exact model, internal configuration, availability, destination, and payment setup can be confirmed first. You can edit and add price tags later.",
  },
  {
    question: "Can every machine use the cashless device?",
    answer: "No universal compatibility is promised. The machine controller, supported interface, network connection, terminal setup, and merchant requirements must be checked before a cashless configuration is confirmed.",
  },
  {
    question: "Can I see product photos before I request a quotation?",
    answer: "Supplied product photos appear on the relevant machine page. Contact IVEND to confirm the exact available unit, configuration, and any additional product photos.",
  },
  {
    question: "What details are needed for a quotation?",
    answer: "Share the machine model, what you plan to sell, your location, available space, temperature needs, and preferred payment method. Then contact our WhatsApp team to confirm availability, configuration, and quotation details.",
  },
];

export default function Home() {
  return (
    <main className="premium-home premium-page">
      <section className="premium-hero" id="top" aria-labelledby="home-title">
        <p className="premium-eyebrow">IVEND / VENDING MACHINE SUPPLIER</p>
        <div className="premium-hero-heading">
          <h1 id="home-title" aria-label="Machines built for opportunity.">
            <span className="premium-title-line">Machines built</span>
            <span className="premium-title-line">for <em>opportunity.</em></span>
          </h1>
        </div>
        <div className="premium-hero-bottom">
          <div className="premium-hero-note">
            <span className="premium-rule" aria-hidden="true" />
            <p>Japanese coffee machines.<br />Modern vending systems.<br />A setup that works for you.</p>
          </div>
          <div className="premium-hero-intro">
            <p>Explore refurbished machines, compatible cashless payments, and support for your next vending project.</p>
            <div className="premium-actions">
              <IVENDLinkButton className="button premium-primary" variant="filled" data-glass="accent" href="/machines">Explore Product Catalog <b aria-hidden="true">↗</b></IVENDLinkButton>
              <a className="premium-text-link" href="/#contact">Talk to IVEND <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <div className="premium-hero-range" aria-label="Product range"><span>Coffee Machines</span><span>TCN Machines</span><span>T05 Cashless</span><a href="#machines">Discover the range <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="catalogue" id="machines">
        <div className="catalogue-head" data-animate="up">
          <div><div className="section-index">01 &mdash; MACHINE CATALOGUE</div><h2>Find your machine.</h2></div>
          <p>Three formats. Different possibilities. Explore the details, then confirm the exact setup with IVEND.</p>
        </div>
        <div className="machine-grid">
          {catalogueMachines.map((machine, index) => <MachineCard machine={machine} index={index} key={machine.slug} />)}
        </div>
        <p className="catalogue-note" data-animate="up">Model availability and specifications are subject to confirmation. Product names are used for identification.</p>
        <a className="premium-text-link" href="/machines">Inside the Product Catalog <span aria-hidden="true">↗</span></a>
      </section>

      <section className="cashless" id="cashless">
        <div className="cashless-visual" data-animate="up"><img src="/t05-terminal-correct.png" width="1254" height="1254" loading="lazy" decoding="async" alt="Actual grey T05 cashless payment device rotated with the camera side facing down" /><span>TAP &bull; SCAN &bull; PAY</span></div>
        <div className="cashless-copy" data-animate="right"><div className="section-index light">02 &mdash; CASHLESS DEVICE</div><div className="t05-label">T05</div><h2>Upgrade compatible machines for cashless payments.</h2><p>Offer contactless card and supported QR payments through T05 technology, with centralised transaction records for the operator.</p><ul><li><span>01</span>Contactless card acceptance</li><li><span>02</span>Supported QR payment methods</li><li><span>03</span>Transaction records and reporting</li></ul><small>Compatibility, connectivity, and available payment methods depend on the machine and merchant setup.</small><IVENDLinkButton href="/products/t05-cashless-device">Explore Cashless Device <b>&#8599;</b></IVENDLinkButton></div>
      </section>

      <section className="guide" id="guide">
        <div className="guide-head" data-animate="up"><div className="section-index">03 &mdash; BEFORE YOU BUY</div><h2>Three details help us<br />recommend a machine.</h2></div>
        <div className="guide-grid"><div data-animate="up"><strong>01</strong><h3>What will it sell?</h3><p>Tell us the product type, package size, and whether it needs heating, cooling, or freezing.</p></div><div data-animate="up" data-animate-delay="1"><strong>02</strong><h3>Where will it go?</h3><p>Share the location, available floor space, expected traffic, and indoor or sheltered placement.</p></div><div data-animate="up" data-animate-delay="2"><strong>03</strong><h3>How should people pay?</h3><p>Choose the payment experience you want, including compatible cashless options.</p></div></div>
      </section>

      <section className="about-section" id="about">
        <div className="about-main" data-animate="up"><div className="section-index">04 &mdash; ABOUT US</div><h2>Equipment for<br /><em>unattended retail.</em></h2></div>
        <div className="about-copy"><p data-animate="left">I Vend Station helps businesses compare vending equipment for modern unattended retail. The range includes Japanese hot-and-cold coffee machines, TCN vending systems, and compatible cashless payment devices.</p><div className="about-points" data-animate="right"><div><span>01</span>Machine selection for different products and locations</div><div><span>02</span>Compatibility checks before cashless integration</div><div><span>03</span>Clear quotation planning for the customer&apos;s setup</div></div></div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-head" data-animate="up"><div><div className="section-index">05 &mdash; FAQ</div><h2>Good questions,<br />clear answers.</h2></div><p>Start here for pricing, product information, cashless compatibility, and quotation information.</p></div>
        <div className="faq-list">
          {faqs.map((faq, index) => <details key={faq.question} data-animate="up" data-animate-delay={String(index % 3)}><summary><small>{String(index + 1).padStart(2, "0")}</small>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <LatestIvend />

      <section className="contact" id="contact">
        <h2 data-animate="up">Tell Us What Vending Machine Support You Need</h2>
        <div className="contact-copy" data-animate="up" data-animate-delay="1">
          <p>Planning to buy, rent, or customize a vending machine? Already have a machine that needs repair?</p>
          <p>Send us your product type, location and requirements. Our team will help you check the suitable machine, payment system or technical support needed.</p>
        </div>
        <div className="contact-actions" data-animate="up" data-animate-delay="2">
          <IVENDLinkButton className="button white" variant="filled" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Contact our WhatsApp team (opens in a new tab)">Contact Our WhatsApp Team <b aria-hidden="true">&#8599;</b></IVENDLinkButton>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
