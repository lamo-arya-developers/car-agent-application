import React from 'react';
import InfoLayout from './InfoLayout';
import Button from './ui/Button';

export default function ContactPage({ onBack }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Kontakt (mock):', { name, email, message });
    alert('Tack! (mock) Vi har inte kopplat mail/API än.');
  }

  return (
    <InfoLayout title="Kontakt" onBack={onBack}>
      <p className="infoP">Skriv ett meddelande så återkommer vi (mock just nu).</p>

      <form className="infoForm" onSubmit={handleSubmit}>
        <label className="infoLabel" htmlFor="contact-name">
          Namn
        </label>
        <input
          id="contact-name"
          className="infoInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ditt namn"
        />

        <label className="infoLabel" htmlFor="contact-email">
          E-post
        </label>
        <input
          id="contact-email"
          className="infoInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="din@epost.se"
        />

        <label className="infoLabel" htmlFor="contact-message">
          Meddelande
        </label>
        <textarea
          id="contact-message"
          className="infoTextarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Skriv här…"
        />

        <Button type="submit">Skicka</Button>
      </form>
    </InfoLayout>
  );
}
