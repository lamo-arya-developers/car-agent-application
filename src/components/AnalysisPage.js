import React from 'react';
import Button from './ui/Button';
import AppHeader from './AppHeader';
import '../styles/analysis.css';

/**
 * AnalysisPage = nästa sida efter att man sparat köpsprofilen.
 * Nybörjar-tänk:
 * - Vi bygger UI:t först (mock).
 * - Senare kopplar vi "Analysera" till riktig logik/backend.
 */
export default function AnalysisPage({
  onNoReg,
  onLogout,
  profileAnswers,
  onOpenInfo,
  onGoToProfile,
  onGoToSaved,
  onShowMockResult,
}) {
  const [tab, setTab] = React.useState('analysis'); // analysis | saved | profile
  const [reg, setReg] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);

  function handleAnalyze() {
    const regUpper = reg.trim().toUpperCase();

    // Köpsprofil-svar finns i profileAnswers (sparade i App) och kan kopplas till riktig analys senare.
    // eslint-disable-next-line no-console
    console.log('Köpsprofil (mock) som ska användas i analys:', profileAnswers);

    // Mock-case: ABC123 visar analysresultat-sidan (formatet som i bilden).
    if (typeof onShowMockResult === 'function') {
      if (!regUpper) {
        alert('Skriv ett registreringsnummer först.');
        return;
      }
      onShowMockResult(regUpper);
      return;
    }
  }

  return (
    <div className="anPage">
      <AppHeader
        onMenuClick={() => setMenuOpen(true)}
        onLogoClick={null}
        navItems={[
          { id: 'about', label: 'Om oss', onClick: () => onOpenInfo?.('about') },
          { id: 'guide', label: 'Guide', onClick: () => onOpenInfo?.('guide') },
          { id: 'logout', label: 'Logga ut', onClick: onLogout },
        ]}
      />

      {menuOpen ? (
        <>
          <div className="anMenuOverlay" onClick={() => setMenuOpen(false)} />
          <div className="anMenuPanel" role="menu" aria-label="Meny">
            <button
              className="anMenuItem"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenInfo?.('about');
              }}
              role="menuitem"
            >
              Om oss
            </button>
            <button
              className="anMenuItem"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenInfo?.('guide');
              }}
              role="menuitem"
            >
              Guide
            </button>
            <button
              className="anMenuItem"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
              role="menuitem"
            >
              Logga ut
            </button>
          </div>
        </>
      ) : null}

      <div className="anTabsWrap">
        <div className="anTabs">
          <button
            className={`anTab ${tab === 'analysis' ? 'anTab--active' : ''}`.trim()}
            onClick={() => setTab('analysis')}
            type="button"
          >
            Analys
          </button>
          <button
            className={`anTab ${tab === 'saved' ? 'anTab--active' : ''}`.trim()}
            onClick={() => {
              setTab('saved');
              onGoToSaved?.();
            }}
            type="button"
          >
            Sparade
          </button>
          <button
            className={`anTab ${tab === 'profile' ? 'anTab--active' : ''}`.trim()}
            onClick={() => {
              setTab('profile');
              onGoToProfile();
            }}
            type="button"
          >
            Köpsprofil
          </button>
        </div>
      </div>

      <div className="anBody">
        <div className="anCard">
          <div className="anCardHeader">
            <div className="anStep">1</div>
            <div className="anTitle">Registreringsnummer</div>
          </div>
          <div className="anHint">Vi behöver registreringsnummer för att hämta data om bilen</div>

          <div className="anRegRow">
            <div className="anFlag">S</div>
            <input
              className="anInput"
              value={reg}
              onChange={(e) => setReg(e.target.value)}
              placeholder="ABC123"
            />
          </div>

          <div className="anDivider" aria-hidden="true">
            <div className="anDividerLine" />
            <div className="anDividerBubble">eller</div>
          </div>
          <button className="anSmallBtn" type="button" onClick={onNoReg}>
            Jag har inte registreringsnumret
          </button>
        </div>
      </div>

      <div className="anBottom">
        <div className="anBottomInner">
          <Button onClick={handleAnalyze}>Analysera</Button>
        </div>
      </div>
    </div>
  );
}

