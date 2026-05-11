import React from 'react';

/**
 * Button = en återanvändbar knapp.
 * Nybörjar-tänk:
 * - variant styr "utseendet" (primary/secondary)
 * - disabled används för att inte kunna klicka när något laddar/är fel
 */
export default function Button({
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  children,
}) {
  return (
    <button
      className={`ui-button ui-button--${variant} ${className}`.trim()}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

