import GuideBuyButton from "./GuideBuyButton";
import { NAV_CTA, NAV_LINKS } from "../config/landing";

export default function SiteNav() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav__bar">
        <a href="#top" className="nav__brand">
          <img className="nav__mark" src="/rose-solid.svg" alt="" />
          <span className="nav__wordmark">the roseprint.</span>
        </a>
        <div className="nav__links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <GuideBuyButton source="nav" size="sm">
          {NAV_CTA}
        </GuideBuyButton>
      </div>
    </nav>
  );
}
