import React from 'react';
import logo from '../images/Logo_no_background.png';
import '../styles/header.css';

/**
 * AppHeader = en header som kan återanvändas på alla sidor.
 * Nybörjar-tänk:
 * - Vi bygger "en sak" (headern) i en egen fil så vi slipper kopiera kod överallt.
 * - Props (inparametrar) låter oss ändra beteende per sida (t.ex. meny-knapp).
 */
export default function AppHeader({ onMenuClick, below, navItems = [], onLogoClick }) {
  return (
    <header className="appHeader">
      <div className="appHeaderTop">
        {typeof onLogoClick === 'function' ? (
          <button
            className="appHeaderLogoButton"
            type="button"
            onClick={onLogoClick}
            aria-label="Gå till analys"
            title="Gå till analys"
          >
            <img className="appHeaderLogo" src={logo} alt="bilköpshjälpen" />
          </button>
        ) : (
          <img className="appHeaderLogo" src={logo} alt="bilköpshjälpen" />
        )}

        {/* Desktop: synlig navigation i headern */}
        {navItems.length > 0 ? (
          <nav className="appHeaderNav" aria-label="Navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="appHeaderNavItem"
                type="button"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ))}
          </nav>
        ) : null}

        {/* Höger: hamburger-knapp (meny) */}
        {onMenuClick ? (
          <button
            className="appHeaderHamburger"
            type="button"
            onClick={onMenuClick}
            aria-label="Öppna meny"
            title="Meny"
          >
            <span className="appHeaderHamburgerLines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        ) : null}
      </div>

      {/* Under-rad: valfritt innehåll (t.ex. titel/description, tabs) */}
      {below ? <div className="appHeaderBelow">{below}</div> : null}
    </header>
  );
}

