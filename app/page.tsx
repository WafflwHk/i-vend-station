"use client";

import { useEffect, useMemo, useState } from "react";

type Product = { id: string; name: string; category: string; price: string; accent: string; mark: string };

const products: Product[] = [
  { id: "water", name: "Mineral Water", category: "Drinks", price: "RM 2.00", accent: "#8ec5ff", mark: "H₂O" },
  { id: "cola", name: "Classic Cola", category: "Drinks", price: "RM 3.00", accent: "#ff6b60", mark: "COLA" },
  { id: "coffee", name: "Iced Coffee", category: "Drinks", price: "RM 4.50", accent: "#c59a72", mark: "CAFÉ" },
  { id: "tea", name: "Lemon Tea", category: "Drinks", price: "RM 3.50", accent: "#f6d75e", mark: "TEA" },
  { id: "chips", name: "Sea Salt Chips", category: "Snacks", price: "RM 3.00", accent: "#8fd7ad", mark: "CRISP" },
  { id: "chocolate", name: "Milk Chocolate", category: "Snacks", price: "RM 4.00", accent: "#a77958", mark: "CHOCO" },
  { id: "cookies", name: "Butter Cookies", category: "Snacks", price: "RM 3.50", accent: "#e9ad65", mark: "COOKIE" },
  { id: "nuts", name: "Roasted Nuts", category: "Snacks", price: "RM 5.00", accent: "#d18b55", mark: "NUTS" },
  { id: "tissue", name: "Pocket Tissue", category: "Essentials", price: "RM 2.00", accent: "#bba8ec", mark: "SOFT" },
  { id: "charger", name: "Charging Cable", category: "Essentials", price: "RM 12.00", accent: "#8c95a3", mark: "USB-C" },
  { id: "mask", name: "Face Mask", category: "Essentials", price: "RM 2.50", accent: "#79cfe0", mark: "MASK" },
  { id: "umbrella", name: "Mini Umbrella", category: "Essentials", price: "RM 18.00", accent: "#dc89a6", mark: "RAIN" },
];

const categories = ["All", "Drinks", "Snacks", "Essentials"];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    try { setPrices(JSON.parse(localStorage.getItem("ivend-prices") || "{}")); } catch { setPrices({}); }
  }, []);

  const savePrice = (id: string, value: string) => {
    const next = { ...prices, [id]: value };
    setPrices(next);
    localStorage.setItem("ivend-prices", JSON.stringify(next));
  };

  const visible = useMemo(() => products.filter((product) =>
    (category === "All" || product.category === category) &&
    product.name.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="I Vend Station home"><span className="brand-dot">I</span> Vend Station</a>
        <div className="nav-links"><a href="#products">Products</a><a href="#about">About</a><a className="contact-pill" href="#contact">Contact</a></div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span /> Everyday convenience, one stop away.</div>
        <h1>Good things.<br/><span>Right where you are.</span></h1>
        <p>A thoughtfully stocked vending station for quick drinks, satisfying snacks, and the small essentials that save your day.</p>
        <div className="hero-actions"><a className="primary" href="#products">Browse the station <b>↓</b></a><a className="secondary" href="#about">Meet I Vend</a></div>
        <div className="machine" aria-hidden="true">
          <div className="machine-glow"/><div className="machine-top"><span>IV</span><i/></div>
          <div className="machine-window">
            {["#ff7168", "#9bd5ff", "#f1c85c", "#82cf9e", "#ba91e0", "#e7a268", "#83cbd5", "#d893ab"].map((color, i) => <div className="mini-product" style={{"--mini": color} as React.CSSProperties} key={i}><span/></div>)}
          </div><div className="machine-slot"/><div className="machine-foot left"/><div className="machine-foot right"/>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="catalogue" id="products">
        <div className="section-head"><div><div className="kicker">THE SELECTION</div><h2>Pick your favourite.</h2></div><p>Tap any price to edit it.<br/>Changes save on this device.</p></div>
        <div className="tools">
          <div className="filters" aria-label="Product categories">{categories.map(item => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <label className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products" aria-label="Search products"/></label>
        </div>
        <div className="product-grid">
          {visible.map((product, index) => <article className="product-card" key={product.id} style={{"--delay": `${index * 45}ms`} as React.CSSProperties}>
            <div className="product-visual" style={{"--accent": product.accent} as React.CSSProperties}><div className={`pack pack-${product.category.toLowerCase()}`}><span>{product.mark}</span><i/></div><div className="shadow"/></div>
            <div className="product-info"><div><span className="category">{product.category}</span><h3>{product.name}</h3></div>
              {editing === product.id ? <input className="price-input" autoFocus value={prices[product.id] ?? product.price} onChange={e => savePrice(product.id, e.target.value)} onBlur={() => setEditing(null)} onKeyDown={e => e.key === "Enter" && setEditing(null)} aria-label={`Edit price for ${product.name}`}/>
              : <button className="price" onClick={() => setEditing(product.id)} title="Edit price">{prices[product.id] ?? product.price}<small>EDIT</small></button>}
            </div>
          </article>)}
        </div>
        {visible.length === 0 && <div className="empty">No products found. Try another search.</div>}
      </section>

      <section className="about" id="about"><div className="about-number">24<span>/7</span></div><div><div className="kicker">ALWAYS WITHIN REACH</div><h2>Your break,<br/>made better.</h2><p>I Vend Station brings reliable convenience to workplaces, residences, and shared spaces—cleanly presented and always ready.</p><div className="benefits"><span>Freshly stocked</span><span>Easy access</span><span>Everyday essentials</span></div></div></section>

      <section className="contact" id="contact"><div className="orb orb-one"/><div className="orb orb-two"/><div className="kicker">LET&apos;S TALK</div><h2>Want I Vend Station<br/>at your location?</h2><p>Contact details can be added here when you&apos;re ready.</p><a href="mailto:hello@example.com">Contact us <b>↗</b></a></section>

      <footer><a className="brand" href="#top"><span className="brand-dot">I</span> Vend Station</a><p>Convenience, beautifully placed.</p><span>© 2026 I Vend Station</span></footer>
    </main>
  );
}
