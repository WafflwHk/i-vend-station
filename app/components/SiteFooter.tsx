import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer" data-animate="up">
      <Link className="brand" href="/" aria-label="I Vend Station home"><img className="brand-logo" src="/i-vend-station-logo.png" alt="" /></Link>
      <p>Vending machines and cashless payment equipment.</p>
      <div><span>&copy; 2026 I Vend Station</span><small>Product names and trademarks belong to their respective owners.</small></div>
    </footer>
  );
}
