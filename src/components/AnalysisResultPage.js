import React from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from './AppHeader';
import '../styles/analysis.css'; // tabs-styling
import '../styles/analysisResult.css';

/**
 * AnalysisResultPage = analys-resultatet (mock).
 * Nybörjar-tänk:
 * - Senare kommer samma "shape" på data från AI-modellen.
 * - Den här sidan visar bara upp datan i ett snyggt format.
 */
export default function AnalysisResultPage({
  getMockResult,
  onLogout,
  onOpenInfo,
  onGoToProfile,
  onGoToSaved,
  onGoToAnalyzeAnother,
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [openId, setOpenId] = React.useState(null);
  const { reg } = useParams();
  const regUpper = (reg || '').trim().toUpperCase();

  // Ladda resultat:
  // 1) om det finns sparat i localStorage använd det
  // 2) annars använd mockData (ABC123)
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    let fromSaved = null;
    try {
      const raw = localStorage.getItem('savedAnalyses');
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        const hit = parsed.find((x) => String(x.regNumber).toUpperCase() === regUpper);
        fromSaved = hit?.result || null;
      }
    } catch {
      fromSaved = null;
    }

    if (fromSaved) {
      setResult(fromSaved);
      return;
    }

    if (typeof getMockResult === 'function') {
      setResult(getMockResult(regUpper));
      return;
    }

    setResult(null);
  }, [regUpper, getMockResult]);

  if (!result) {
    return null;
  }

  const badgeFor = (status) => {
    if (status === 'ok') return <span className="arBadgeOk">✓</span>;
    if (status === 'warn') return <span className="arBadgeWarn">!</span>;
    return <span className="arBadgeInfo">i</span>;
  };

  return (
    <div className="arPage">
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
          <button className="anTab anTab--active" type="button">
            Analys
          </button>
          <button className="anTab" type="button" onClick={onGoToSaved}>
            Sparade
          </button>
          <button className="anTab" type="button" onClick={onGoToProfile}>
            Köpsprofil
          </button>
        </div>
      </div>

      <div className="arWrap">
        <div className="arContainer">
          <div className="arCard">
            {/* Samma regnummer-rad som på /analys (blå S + "regskylt") */}
            <div className="anRegRow">
              <div className="anFlag">S</div>
              <input className="anInput" value={result.regNumber} readOnly />
            </div>
            <div className="arCarTitle">{result.car.title}</div>
            <div className="arCarSub">{result.car.subtitle}</div>
          </div>

          <div className="arCard">
            <div className="arMatchRow">
              <div className="arScore">
                <div>{result.profileMatch.score}</div>
                <div className="arScoreSmall">/100</div>
              </div>
              <div>
                <div className="arMatchTitle">
                  {result.profileMatch.label}{' '}
                  <span className="arMatchValue">{result.profileMatch.value}</span>
                </div>
                <div className="arMatchDesc">{result.profileMatch.description}</div>
              </div>
            </div>
          </div>

          <div className="arCard">
            <div className="arSectionTitle">Sammanfattning</div>

            <div style={{ display: 'grid', gap: 8 }}>
              {result.summary.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="arItem">
                    <button
                      className="arItemBtn"
                      type="button"
                      onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                    >
                      <span className="arItemLeft">
                        {badgeFor(item.status)}
                        <span>{item.title}</span>
                      </span>
                      <span>{isOpen ? '▴' : '▾'}</span>
                    </button>
                    {isOpen ? <div className="arItemBody">{item.details}</div> : null}
                  </div>
                );
              })}
            </div>

            <div style={{ height: 10 }} />
            <div className="arTip">
              <strong>{result.tip.title}:</strong> {result.tip.text}
            </div>
          </div>

          <div className="arButtons">
            <button
              className="arBtnPrimary"
              type="button"
              onClick={() => {
                const scorePercent = Math.round((result.profileMatch?.score ?? 0));
                const item = {
                  id: `${result.regNumber}-${Date.now()}`,
                  regNumber: result.regNumber,
                  score: scorePercent,
                  savedAt: new Date().toISOString(),
                  result,
                };

                try {
                  const raw = localStorage.getItem('savedAnalyses');
                  const parsed = raw ? JSON.parse(raw) : [];
                  const list = Array.isArray(parsed) ? parsed : [];

                  // Deduplicate per regnummer: behåll bara senaste
                  const filtered = list.filter(
                    (x) => String(x.regNumber).toUpperCase() !== String(result.regNumber).toUpperCase(),
                  );
                  localStorage.setItem('savedAnalyses', JSON.stringify([item, ...filtered].slice(0, 50)));
                } catch {
                  // Om localStorage misslyckas, gör inget mer (mock).
                }

                onGoToSaved?.();
              }}
            >
              Spara analys
            </button>
            <button className="arBtnSecondary" type="button" onClick={onGoToAnalyzeAnother}>
              Analysera en annan bil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

