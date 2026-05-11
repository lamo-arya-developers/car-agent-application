import React from 'react';

/**
 * Divider = en liten "avdelare" med text (t.ex. "eller").
 * Nybörjar-tänk: det gör att sidan blir lättare att läsa visuellt.
 */
export default function Divider({ text = 'eller' }) {
  return (
    <div className="ui-divider" role="separator" aria-label={text}>
      <div className="ui-dividerLine" />
      <div>{text}</div>
      <div className="ui-dividerLine" />
    </div>
  );
}

