import React from 'react';

import backgroundMobile from '../images/background.png';
import backgroundDesktop from '../images/bakgrund-web.png';
import logo from '../images/Logo_no_background.png';

import Card from './ui/Card';
import Button from './ui/Button';
import Divider from './ui/Divider';
import TextField from './ui/TextField';
import PasswordField from './ui/PasswordField';

import '../styles/login.css';
import mockData from '../mock-data/mockData.json';

/**
 * LoginPage = en hel sida.
 * Nybörjar-tänk:
 * - En "page" sätter layout och sätter ihop flera mindre komponenter.
 * - Den här sidan gör ingen riktig inloggning än (det kopplar man ofta till backend/Firebase sen).
 */
export default function LoginPage({ onLoggedIn }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  // En enkel (väldigt basic) validering bara för att visa konceptet.
  const canSubmit = email.trim().length > 0 && password.trim().length > 0 && !loading;

  // Mock-användare (testkonto) ligger i JSON så vi kan byta till riktig data senare.
  const MOCK_USER = mockData.auth.users[0];

  async function handleLogin(e) {
    e.preventDefault(); // hindrar browsern från att ladda om sidan
    setError('');
    setSuccess(false);

    if (!canSubmit) {
      setError('Fyll i e-post och lösenord.');
      return;
    }

    try {
      setLoading(true);

      // Fejk-laddning så du ser "loading"
      await new Promise((r) => setTimeout(r, 400));

      // "Mock login": kolla om användaren skrev in rätt test-uppgifter.
      const ok =
        email.trim().toLowerCase() === MOCK_USER.email &&
        password.trim() === MOCK_USER.password;

      if (!ok) {
        setError('Fel e-post eller lösenord (test: test@test.com / 1234).');
        return;
      }

      // Här hade du normalt skickat användaren vidare till nästa sida.
      setSuccess(true);
      if (typeof onLoggedIn === 'function') {
        onLoggedIn({ email: MOCK_USER.email, displayName: MOCK_USER.displayName });
      }
    } catch (err) {
      setError('Något gick fel. Försök igen.');
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSignIn() {
    // Här kopplar du in Google auth senare (t.ex. Firebase).
    setError('Google-inloggning är inte inkopplad än.');
  }

  return (
    <div
      className="loginPage"
      style={{
        // Nybörjar-tänk:
        // - Vi sparar bild-url:erna i CSS-variabler så CSS kan byta bild via media query (mobil vs desktop).
        // - CSS bestämmer vilken som används beroende på skärmstorlek.
        '--bg-mobile': `url(${backgroundMobile})`,
        '--bg-desktop': `url(${backgroundDesktop})`,
      }}
    >
      <Card className="loginCard">
        <div className="loginLogoWrap">
          <img className="loginLogo" src={logo} alt="bilköpshjälpen" />
        </div>

        <form onSubmit={handleLogin}>
          <TextField
            label="E-postadress"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="erik@gmail.com"
            autoComplete="email"
          />

          <PasswordField
            label="Lösenord"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <div className="loginActions">
            <Button type="submit" disabled={!canSubmit}>
              {loading ? 'Loggar in...' : 'Logga in'}
            </Button>
          </div>

          {error ? <div className="ui-error">{error}</div> : null}
          {success ? <div className="ui-error" style={{ color: '#065f46' }}>Inloggad! (mock)</div> : null}

          <Divider text="eller" />

          <Button
            variant="secondary"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="googleButton"
          >
            <span className="googleButtonInner">
              <span className="googleBadge">G</span>
              <span>Sign in with Google</span>
            </span>
          </Button>

          <div className="loginFooter">
            Har du inget konto? <a href="#skapa-konto">Skapa ett konto</a>
          </div>
        </form>
      </Card>
    </div>
  );
}

