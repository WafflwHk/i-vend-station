const machines = [
  {
    code: "JAPAN SERIES",
    name: "Hot & Cold Coffee Machine",
    type: "Coffee vending",
    art: "coffee-art",
    image: "/hot-cold-coffee-machine.jpg",
    copy: "The actual hot-and-cold coffee vending machine available from I Vend Station.",
    featured: true,
  },
  {
    code: "TCN-D720-6G",
    name: "Compact Vending Machine",
    type: "Compact series",
    art: "compact-art",
    image: null,
    copy: "A compact floor-standing format for locations where space and a clean footprint matter.",
  },
  {
    code: "TCN-D720-10G",
    name: "Classic Vending Machine",
    type: "Standard series",
    art: "classic-art",
    image: null,
    copy: "A full-size machine platform with a larger display area and flexible product configuration.",
  },
  {
    code: "TCN-D720-10C (V22)",
    name: "Touchscreen Vending Machine",
    type: "Touchscreen series",
    art: "touch-art",
    image: null,
    copy: "A modern vending format with a visual touchscreen purchasing experience.",
  },
  {
    code: "TCN-D720-10C (V22) + 10R",
    name: "Double Cabinet Machine",
    type: "High-capacity series",
    art: "double-art",
    image: null,
    copy: "An expanded two-cabinet format for larger capacity and a broader product plan.",
  },
  {
    code: "TCN-FEL-9C (V22)",
    name: "Frozen Food Vending Machine",
    type: "Frozen series",
    art: "frozen-art",
    image: null,
    copy: "A touchscreen machine format designed for frozen products and controlled cold storage.",
  },
  {
    code: "TCN-CFM-4C (H32)",
    name: "Hot Food Vending Machine",
    type: "Hot food series",
    art: "hot-art",
    image: null,
    copy: "An automated machine format for storing and preparing selected packaged meals for collection.",
  },
];

function MachineArt({ kind }: { kind: string }) {
  if (kind === "double-art") {
    return <div className={`machine-art ${kind}`}><div className="cabinet left-cab"><div className="art-glass">{[1,2,3,4,5].map(i => <i key={i}/>)}</div><b/></div><div className="cabinet right-cab"><div className="art-screen"/><div className="art-pay"/><b/></div></div>;
  }
  return <div className={`machine-art ${kind}`}><div className="cabinet"><div className="art-brand">IV</div><div className="art-glass">{[1,2,3,4,5].map(i => <i key={i}/>)}</div><div className="art-screen"/><div className="art-pay"/><b/></div></div>;
}

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="I Vend Station home"><span className="brand-mark">I</span><span>I Vend Station</span></a>
        <div className="nav-links"><a href="#machines">Machines</a><a href="#cashless">Cashless</a><a href="#guide">Buying guide</a><a className="nav-cta" href="#contact">Get a quote <span>↗</span></a></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> VENDING MACHINE SUPPLIER</div>
          <h1>Machines built<br/><em>for opportunity.</em></h1>
          <p>Explore Japanese coffee machines, TCN vending systems, and a cashless upgrade for modern unattended retail.</p>
          <div className="hero-actions"><a className="button dark" href="#machines">View all machines <b>↓</b></a><a className="text-link" href="#contact">Ask for a quote <span>↗</span></a></div>
        </div>
        <div className="hero-showcase" aria-label="Vending machine range">
          <div className="hero-ring"/>
          <div className="showcase-unit unit-one"><MachineArt kind="classic-art"/></div>
          <div className="showcase-unit unit-two"><MachineArt kind="touch-art"/></div>
          <div className="showcase-unit unit-three"><MachineArt kind="compact-art"/></div>
          <div className="showcase-badge"><span>07</span> MACHINE TYPES</div>
        </div>
        <div className="hero-foot"><span>JAPAN SERIES</span><i/><span>TCN SERIES</span><i/><span>T05 CASHLESS</span></div>
      </section>

      <section className="catalogue" id="machines">
        <div className="catalogue-head">
          <div><div className="section-index">01 — MACHINE CATALOGUE</div><h2>Find your machine.</h2></div>
          <p>A clear starting range based on the machines you sell. Prices and final specifications can be added after each exact unit is confirmed.</p>
        </div>
        <div className="category-pills"><span className="active">All machines</span><span>Japanese coffee</span><span>TCN standard</span><span>Touchscreen</span><span>Specialised</span></div>
        <div className="machine-grid">
          {machines.map((machine, index) => (
            <article className={`machine-card ${machine.featured ? "featured" : ""}`} key={machine.code}>
              <div className="card-top"><span>{machine.type}</span><small>{String(index + 1).padStart(2,"0")}</small></div>
              <div className="card-art"><div className="card-glow"/>{machine.image ? <img className="machine-photo" src={machine.image} alt="Hot and cold coffee vending machine available from I Vend Station"/> : <MachineArt kind={machine.art}/>}</div>
              <div className="card-copy"><div className="model-code">{machine.code}</div><h3>{machine.name}</h3><p>{machine.copy}</p><div className="card-bottom"><strong>Request quotation</strong><a href={`mailto:hello@example.com?subject=Enquiry: ${encodeURIComponent(machine.code)}`} aria-label={`Ask about ${machine.name}`}>↗</a></div></div>
            </article>
          ))}
        </div>
        <p className="catalogue-note">Model availability and specifications are subject to confirmation. Product names are used for identification.</p>
      </section>

      <section className="cashless" id="cashless">
        <div className="cashless-visual"><div className="cash-orbit one"/><div className="cash-orbit two"/><img src="/t05-terminal.png" alt="T05 cashless payment terminal"/><span>TAP • SCAN • PAY</span></div>
        <div className="cashless-copy"><div className="section-index light">02 — CASHLESS ADD-ON</div><div className="t05-label">T05</div><h2>Upgrade compatible machines for cashless payments.</h2><p>Offer contactless card and supported QR payments through T05 technology, with centralised transaction records for the operator.</p><ul><li><span>01</span>Contactless card acceptance</li><li><span>02</span>Supported QR payment methods</li><li><span>03</span>Transaction records and reporting</li></ul><small>Compatibility, connectivity, and available payment methods depend on the machine and merchant setup.</small><a href="/products/t05-cashless-device">Explore T05 <b>↗</b></a></div>
      </section>

      <section className="guide" id="guide">
        <div className="guide-head"><div className="section-index">03 — BEFORE YOU BUY</div><h2>Three details help us<br/>recommend a machine.</h2></div>
        <div className="guide-grid"><div><strong>01</strong><h3>What will it sell?</h3><p>Tell us the product type, package size, and whether it needs heating, cooling, or freezing.</p></div><div><strong>02</strong><h3>Where will it go?</h3><p>Share the location, available floor space, expected traffic, and indoor or sheltered placement.</p></div><div><strong>03</strong><h3>How should people pay?</h3><p>Choose the payment experience you want, including compatible cashless options.</p></div></div>
      </section>

      <section className="contact" id="contact"><div className="contact-glow one"/><div className="contact-glow two"/><div className="section-index light">04 — REQUEST A QUOTATION</div><h2>Which machine<br/>fits your plan?</h2><p>Send the model name, your location, and what you want to sell.</p><div className="contact-actions"><a className="button white" href="mailto:hello@example.com?subject=I Vend Station machine quotation">Contact I Vend Station <b>↗</b></a><span>Replace this with your phone,<br/>WhatsApp, or email when ready.</span></div></section>

      <footer><a className="brand" href="#top"><span className="brand-mark">I</span><span>I Vend Station</span></a><p>Vending machines and cashless payment equipment.</p><div><span>© 2026 I Vend Station</span><small>Product names and trademarks belong to their respective owners.</small></div></footer>
    </main>
  );
}
