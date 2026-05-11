import React from 'react';

/**
 * TextField = label + input.
 * Nybörjar-tänk: detta är ett "form-fält" vi kan återanvända för e-post, namn osv.
 */
export default function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  autoComplete,
  name,
}) {
  return (
    <label className="ui-field">
      <span className="ui-label">{label}</span>
      <span className="ui-inputWrap">
        <input
          className="ui-input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </span>
    </label>
  );
}

