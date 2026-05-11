import React from 'react';

/**
 * Card = en återanvändbar "panel".
 * Nybörjar-tänk: vi använder den för att få samma rundade hörn/skugga på flera ställen.
 */
export default function Card({ className = '', children }) {
  return <div className={`ui-card ${className}`.trim()}>{children}</div>;
}

