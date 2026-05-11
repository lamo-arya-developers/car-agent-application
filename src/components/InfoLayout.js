import React from 'react';
import '../styles/info.css';

/**
 * InfoLayout = en enkel layout för "info"-sidor.
 * Nybörjar-tänk: vi återanvänder samma topp (tillbaka + titel) så sidorna blir likadana.
 */
export default function InfoLayout({ title, onBack, children }) {
  return (
    <div className="infoPage">
      <div className="infoTop">
        <button className="infoBack" type="button" onClick={onBack}>
          Tillbaka
        </button>
        <div className="infoTopSpacer" aria-hidden="true" />
      </div>

      <div className="infoBody">
        <div className="infoHero">
          <div className="infoTitle">{title}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
