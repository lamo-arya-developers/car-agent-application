import React from 'react';
import mockData from '../mock-data/mockData.json';

import Button from './ui/Button';
import AppHeader from './AppHeader';
import '../styles/kopprofil.css';
import '../styles/analysis.css';

/**
 * KopProfilPage = sidan efter inloggning.
 * Nybörjar-tänk:
 * - All "data" om frågor/alternativ ligger i JSON (mock-data).
 * - Sidan renderar UI baserat på JSON.
 * - Senare kan vi byta JSON mot riktig backend, utan att ändra hela UI:t.
 */
export default function KopProfilPage({
  user,
  onLogout,
  onSaved,
  onOpenInfo,
  onGoToAnalysis,
  onGoToSaved,
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Här sparar vi användarens svar i state.
  // Nybörjar-tänk: state är Reacts "minne" som gör att UI uppdateras när något ändras.
  const [answers, setAnswers] = React.useState({
    usage: null,
    driving: {
      dailyDistance: '',
      mostDriving: '',
      importantFeatures: '',
    },
    priorities: [],
    budget: {
      priceRange: '',
      monthlyCost: '',
    },
    notes: '',
  });

  const { kopprofil } = mockData;
  // Den här texten är "fast" på sidan (inte mockdata).
  const PAGE_TITLE = 'Din köpsprofil';
  const PAGE_DESCRIPTION =
    'Fyll i information om dina behov och vad som är viktigt för dig.\n' +
    'Vi använder detta som grund när vi analyserar bilar åt dig.';

  function togglePriority(id) {
    setAnswers((prev) => {
      const has = prev.priorities.includes(id);
      return {
        ...prev,
        priorities: has ? prev.priorities.filter((x) => x !== id) : [...prev.priorities, id],
      };
    });
  }

  function handleSave() {
    // Nybörjar-tänk:
    // I riktig app skulle du göra ett API-anrop här och spara i databasen.
    // Just nu loggar vi bara till console för att du ska se att datan finns.
    // (Öppna devtools/console i browsern för att se det.)
    // eslint-disable-next-line no-console
    console.log('Köpsprofil (mock) sparad:', { user, answers });
    if (typeof onSaved === 'function') {
      onSaved(answers);
    }
  }

  return (
    <div className="kpPage">
      <div className="kpMobileHeader">
        <AppHeader
          onMenuClick={() => setMenuOpen(true)}
          onLogoClick={onGoToAnalysis}
          navItems={[
            { id: 'about', label: 'Om oss', onClick: () => onOpenInfo?.('about') },
            { id: 'guide', label: 'Guide', onClick: () => onOpenInfo?.('guide') },
            { id: 'logout', label: 'Logga ut', onClick: onLogout },
          ]}
          below={
            <div className="kpHeaderText">
              <div className="kpHeaderTitle">{PAGE_TITLE}</div>
              <div className="kpHeaderDesc">{PAGE_DESCRIPTION}</div>
            </div>
          }
        />

        {/* Tabs-raden (samma som på Analys-sidan) */}
        <div className="anTabsWrap">
          <div className="anTabs">
            <button className="anTab" type="button" onClick={onGoToAnalysis}>
              Analys
            </button>
            <button
              className="anTab"
              type="button"
              onClick={onGoToSaved}
            >
              Sparade
            </button>
            <button className="anTab anTab--active" type="button">
              Köpsprofil
            </button>
          </div>
        </div>
      </div>

      {/* Mobilmeny: overlay + panel */}
      {menuOpen ? (
        <>
          <div className="kpMenuOverlay" onClick={() => setMenuOpen(false)} />
          <div className="kpMenuPanel" role="menu" aria-label="Meny">
            <button
              className="kpMenuItem"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenInfo?.('about');
              }}
              role="menuitem"
            >
              <span>Om oss</span>
            </button>

            <button
              className="kpMenuItem"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenInfo?.('guide');
              }}
              role="menuitem"
            >
              <span>Guide</span>
            </button>

            <button
              className="kpMenuItem"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
              role="menuitem"
            >
              <span>Logga ut</span>
            </button>
          </div>
        </>
      ) : null}

      <div className="kpCard">
        {/* 1) Hur ska bilen användas? */}
        <div className="kpSection">
          <div className="kpSectionHeader">
            <div className="kpBadge">1</div>
            <div className="kpSectionTitle">Hur ska bilen användas?</div>
          </div>

          <div className="kpOptions">
            {kopprofil.sections
              .find((s) => s.id === 'usage')
              .options.map((opt) => {
                const selected = answers.usage === opt.id;
                return (
                  <div
                    key={opt.id}
                    className="kpOption"
                    onClick={() => setAnswers((p) => ({ ...p, usage: opt.id }))}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="kpOptionLeft">
                      <div className="kpOptionLabel">{opt.label}</div>
                      <div className="kpOptionHint">{opt.hint}</div>
                    </div>
                    <div className="kpCheck">{selected ? '✓' : ''}</div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 2) Körmönster */}
        <div className="kpSection">
          <div className="kpSectionHeader">
            <div className="kpBadge">2</div>
            <div className="kpSectionTitle">Körmönster</div>
          </div>

          {kopprofil.sections
            .find((s) => s.id === 'driving')
            .fields.map((f) => (
              <div className="kpField" key={f.id}>
                <div className="kpLabel">{f.label}</div>
                <select
                  className="kpSelect"
                  value={answers.driving[f.id]}
                  onChange={(e) =>
                    setAnswers((p) => ({
                      ...p,
                      driving: { ...p.driving, [f.id]: e.target.value },
                    }))
                  }
                >
                  <option value="">Välj…</option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>

        {/* 3) Vad är viktigast för dig? */}
        <div className="kpSection">
          <div className="kpSectionHeader">
            <div className="kpBadge">3</div>
            <div className="kpSectionTitle">Vad är viktigast för dig?</div>
          </div>

          <div className="kpOptions">
            {kopprofil.sections
              .find((s) => s.id === 'priorities')
              .options.map((opt) => {
                const selected = answers.priorities.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    className="kpOption"
                    onClick={() => togglePriority(opt.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="kpOptionLeft">
                      <div className="kpOptionLabel">{opt.label}</div>
                    </div>
                    <div className="kpCheck">{selected ? '✓' : ''}</div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 4) Budget */}
        <div className="kpSection">
          <div className="kpSectionHeader">
            <div className="kpBadge">4</div>
            <div className="kpSectionTitle">Budget</div>
          </div>

          {kopprofil.sections
            .find((s) => s.id === 'budget')
            .fields.map((f) => (
              <div className="kpField" key={f.id}>
                <div className="kpLabel">{f.label}</div>
                <select
                  className="kpSelect"
                  value={answers.budget[f.id]}
                  onChange={(e) =>
                    setAnswers((p) => ({
                      ...p,
                      budget: { ...p.budget, [f.id]: e.target.value },
                    }))
                  }
                >
                  <option value="">Välj…</option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>

        {/* Extra: Noteringar */}
        <div className="kpSection">
          <div className="kpSectionTitle">Något annat vi bör veta? (valfritt)</div>
          <div style={{ height: 8 }} />
          <textarea
            className="kpTextarea"
            value={answers.notes}
            onChange={(e) => setAnswers((p) => ({ ...p, notes: e.target.value }))}
            placeholder={kopprofil.sections.find((s) => s.id === 'notes').placeholder}
          />
        </div>
      </div>

      <div className="kpSaveWrap">
        <Button onClick={handleSave}>Spara köpsprofil</Button>
      </div>
    </div>
  );
}

