import React from 'react';

/**
 * PasswordField = som TextField, men med "visa/dölj lösenord".
 * Nybörjar-tänk:
 * - vi använder state (useState) för att komma ihåg om vi visar text eller inte
 */
export default function PasswordField({
  label,
  value,
  onChange,
  placeholder = '',
  autoComplete,
  name,
}) {
  const [show, setShow] = React.useState(false);

  return (
    <label className="ui-field">
      <span className="ui-label">{label}</span>
      <span className="ui-inputWrap">
        <input
          className="ui-input"
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />

        <button
          className="ui-rightIconButton"
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Dölj lösenord' : 'Visa lösenord'}
          title={show ? 'Dölj lösenord' : 'Visa lösenord'}
        >
          {/* Enkel text-knapp. Senare kan du byta till riktig ikon (SVG) om du vill. */}
          {show ? 'Dölj' : 'Visa'}
        </button>
      </span>
    </label>
  );
}

