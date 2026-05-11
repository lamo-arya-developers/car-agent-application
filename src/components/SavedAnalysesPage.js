import React from 'react';
import AppHeader from './AppHeader';
import '../styles/analysis.css';

/**
 * SavedAnalysesPage = listar sparade analyser (mock).
 * Nybörjar-tänk:
 * - Vi sparar i localStorage så det ligger kvar vid refresh.
 * - Senare kan detta bytas mot databas/API.
 */
export default function SavedAnalysesPage({ onOpenInfo, onLogout, onGoToProfile, onGoToAnalysis, onOpenReport }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('savedAnalyses');
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  }, []);

  return (
    <div className="anPage">
      <AppHeader
        onMenuClick={() => setMenuOpen(true)}
        onLogoClick={onGoToAnalysis}
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
            >
              Logga ut
            </button>
          </div>
        </>
      ) : null}

      <div className="anTabsWrap">
        <div className="anTabs">
          <button className="anTab" type="button" onClick={onGoToAnalysis}>
            Analys
          </button>
          <button className="anTab anTab--active" type="button">
            Sparade
          </button>
          <button className="anTab" type="button" onClick={onGoToProfile}>
            Köpsprofil
          </button>
        </div>
      </div>

      <div className="anBody">
        <div className="anCard">
          <div className="anCardHeader">
            <div className="anStep">✓</div>
            <div className="anTitle">Sparade analyser</div>
          </div>

          {items.length === 0 ? (
            <div className="anHint">Du har inga sparade analyser än.</div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {items.map((x) => (
                <button
                  key={x.id}
                  className="anSmallBtn"
                  type="button"
                  onClick={() => onOpenReport(x.regNumber)}
                  style={{ height: 'auto', padding: 12, textAlign: 'left' }}
                >
                  <div style={{ fontWeight: 900 }}>{x.regNumber}</div>
                  <div style={{ fontSize: 12, color: 'rgba(17, 24, 39, 0.7)', marginTop: 2 }}>
                    Matchning: {x.score}% • Sparad: {new Date(x.savedAt).toLocaleDateString('sv-SE')}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

