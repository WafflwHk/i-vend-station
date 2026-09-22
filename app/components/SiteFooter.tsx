import { IVEND_VERSION, IVEND_RELEASE_STATUS } from "../config/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer" data-animate="up">
      <a className="brand" href="/" aria-label="I Vend Station home"><img className="brand-logo" src="/i-vend-station-logo.png" alt="" /></a>
      <p>Vending machines and cashless payment equipment.</p>
      <div><span>&copy; 2026 I Vend Station · {IVEND_VERSION} {IVEND_RELEASE_STATUS}</span><a className="footer-legal-link" href="/privacy">Privacy Policy</a><small>Product names and trademarks belong to their respective owners.</small></div>
    </footer>
  );
}
