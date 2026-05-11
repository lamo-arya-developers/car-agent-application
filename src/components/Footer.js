import React from 'react';
import '../styles/footer.css';
import { Link, useLocation } from 'react-router-dom';

/**
 * Footer = länkar som ska finnas längst ner på sidan.
 * Nybörjar-tänk:
 * - Vi använder Link (React Router) för att navigera utan att ladda om sidan,
 *   och samtidigt få riktiga URL:er (t.ex. /omoss).
 */
export default function Footer() {
  const { pathname } = useLocation();

  // Hjälp-funktion för att ge "aktiv" känsla (valfritt)
  const isActive = (path) => pathname === path;

  return (
    <footer className="appFooter">
      <Link className={`appFooterLink ${isActive('/omoss') ? 'appFooterLink--active' : ''}`.trim()} to="/omoss">
        Om oss
      </Link>
      <Link
        className={`appFooterLink ${isActive('/kontakt') ? 'appFooterLink--active' : ''}`.trim()}
        to="/kontakt"
      >
        Kontakt
      </Link>
      <Link className={`appFooterLink ${isActive('/gdpr') ? 'appFooterLink--active' : ''}`.trim()} to="/gdpr">
        GDPR
      </Link>
      <Link className={`appFooterLink ${isActive('/guide') ? 'appFooterLink--active' : ''}`.trim()} to="/guide">
        Guide
      </Link>
    </footer>
  );
}
