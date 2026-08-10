const products = [
  {
    number: "01",
    name: "Japanese Hot & Cold Coffee",
    short: "Coffee systems",
    image: "/japan-coffee.webp",
    imageClass: "coffee-image",
    theme: "blue",
    headline: "One machine. Every coffee moment.",
    body: "Serve both hot and cold cup drinks from a proven Japanese vending platform. A strong fit for offices, factories, hospitals, campuses, and busy public locations.",
    points: ["Hot + cold drink selections", "High-capacity cup operation", "Cashless-ready configurations"],
    note: "Exact features depend on model and configuration.",
  },
  {
    number: "02",
    name: "TCN Vending Machines",
    short: "Smart retail",
    image: "/tcn-machine.jpg",
    imageClass: "tcn-image",
    theme: "graphite",
    headline: "A smarter way to sell, 24/7.",
    body: "Flexible TCN vending systems for snacks, bottled drinks, fresh food, and other retail products. Choose a machine around your product mix, capacity, and location.",
    points: ["Snack + beverage options", "Touchscreen models available", "Flexible product configurations"],
    note: "Product capacity and cooling vary by selected model.",
  },
  {
    number: "03",
    name: "T05 Cashless Device",
    short: "Cashless payments",
    image: "/t05-terminal.png",
    imageClass: "terminal-image",
    theme: "coral",
    headline: "Turn cash-only into cashless-ready.",
    body: "Upgrade compatible unattended machines with T05 payment technology, giving customers a faster way to pay and operators a clearer view of transactions.",
    points: ["Contactless card acceptance", "Supported QR payment methods", "Centralised transaction records"],
    note: "Payment methods depend on region, connectivity, and merchant setup.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="I Vend Station home">
          <span className="brand-mark">I</span><span>I Vend Station</span>
        </a>
        <div className="nav-links">
          <a href="#machines">Machines</a>
          <a href="#cashless">Cashless</a>
          <a href="#why-us">Why us</a>
          <a className="nav-cta" href="#contact">Get a quote <span>↗</span></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> VENDING EQUIPMENT &amp; PAYMENTS</div>
          <h1>Build a better<br/><em>vending business.</em></h1>
          <p>Japanese coffee systems, TCN vending machines, and T05 cashless technology—brought together by I Vend Station.</p>
          <div className="hero-actions">
            <a className="button dark" href="#machines">Explore machines <b>↓</b></a>
            <a className="text-link" href="#contact">Talk to sales <span>↗</span></a>
          </div>
        </div>

        <div className="hero-stage" aria-label="Our vending equipment range">
          <div className="stage-halo" />
          <div className="stage-card stage-main"><span>TCN</span><img src="/tcn-machine.jpg" alt="TCN snack and drink vending machine" /></div>
          <div className="stage-card stage-coffee"><span>JAPAN</span><img src="/japan-coffee.webp" alt="Japanese hot and cold cup coffee vending machine" /></div>
          <div className="stage-card stage-pay"><span>T05 PAY</span><img src="/t05-terminal.png" alt="T05 cashless payment terminal" /></div>
          <div className="stage-label"><i /> Three ways to grow</div>
        </div>

        <div className="hero-foot">
          <span>MACHINES</span><i /><span>PAYMENTS</span><i /><span>BUSINESS-READY SOLUTIONS</span>
        </div>
      </section>

      <section className="intro" id="machines">
        <div className="section-index">01 — OUR RANGE</div>
        <div className="intro-copy"><h2>The right machine<br/>for the right opportunity.</h2><p>Start with the product you want to sell. We help you match it to a vending format and a payment experience built for modern customers.</p></div>
      </section>

      <section className="product-list">
        {products.map((product) => (
          <article className={`product-row ${product.theme}`} id={product.number === "03" ? "cashless" : undefined} key={product.number}>
            <div className="product-visual">
              <div className="product-orbit" />
              <span className="product-number">{product.number}</span>
              <img className={product.imageClass} src={product.image} alt={product.name} />
              <div className="product-caption"><i /> {product.short}</div>
            </div>
            <div className="product-copy">
              <div className="product-kicker">{product.name}</div>
              <h3>{product.headline}</h3>
              <p>{product.body}</p>
              <ul>{product.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul>
              <div className="product-bottom"><a href={`mailto:hello@example.com?subject=Enquiry: ${encodeURIComponent(product.name)}`}>Ask about this product <span>↗</span></a><small>{product.note}</small></div>
            </div>
          </article>
        ))}
      </section>

      <section className="why" id="why-us">
        <div className="why-head"><div className="section-index light">02 — WHY I VEND</div><h2>One station.<br/><span>More possibilities.</span></h2></div>
        <div className="why-grid">
          <div><strong>01</strong><h3>Choose your format</h3><p>Coffee, snacks, drinks, fresh food, or specialised retail—we start with what you want to sell.</p></div>
          <div><strong>02</strong><h3>Match the machine</h3><p>Compare machine types and configurations around your location, capacity, and operating plan.</p></div>
          <div><strong>03</strong><h3>Add cashless</h3><p>Make compatible machines easier to use with T05 contactless and supported QR payment options.</p></div>
        </div>
      </section>

      <section className="audience">
        <div className="section-index">03 — BUILT FOR BUSINESS</div>
        <h2>Put unattended retail<br/>to work in more places.</h2>
        <div className="places"><span>Offices</span><span>Factories</span><span>Residences</span><span>Campuses</span><span>Hospitals</span><span>Public spaces</span></div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-glow one"/><div className="contact-glow two"/>
        <div className="section-index light">04 — START A CONVERSATION</div>
        <h2>Tell us what you<br/>want to vend.</h2>
        <p>We&apos;ll help you start with the right machine and payment setup.</p>
        <div className="contact-actions"><a className="button white" href="mailto:hello@example.com?subject=I Vend Station quotation">Request a quotation <b>↗</b></a><span>Replace with your phone, WhatsApp,<br/>or email when ready.</span></div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">I</span><span>I Vend Station</span></a>
        <p>Vending machines. Coffee systems. Cashless payments.</p>
        <div><span>© 2026 I Vend Station</span><small>Product names and trademarks belong to their respective owners.</small></div>
      </footer>
    </main>
  );
}
