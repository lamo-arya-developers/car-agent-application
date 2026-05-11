import React from 'react';
import AppHeader from './AppHeader';
import Button from './ui/Button';
import mockData from '../mock-data/mockData.json';
import '../styles/analysis.css'; // återanvänd tabs-styling
import '../styles/carinfo.css';

/**
 * CarInfoPage = sidan man kommer till om man inte har registreringsnumret.
 * Nybörjar-tänk:
 * - Vi bygger formuläret först (mock).
 * - Senare kan vi koppla detta till riktig data/back-end.
 */
export default function CarInfoPage({ onGoToAnalysis, onGoToProfile, onLogout, onOpenInfo }) {
  const [tab, setTab] = React.useState('analysis');
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    make: '',
    model: '',
    year: '',
    bodyType: '',
    fuel: '',
    gearbox: '',
    engine: '',
    power: '',
    envClass: '',
    mileage: '',
    nextInspectMonth: 'Sep',
    nextInspectYear: '2025',
    owners: 1,
  });

  const { carInfo } = mockData;

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function renderOptions(list) {
    return list.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
  }

  function handleAnalyze() {
    // eslint-disable-next-line no-console
    console.log('Bilinfo (mock):', form);
    alert('Analysera (mock). Kolla console för bilinfo.');
  }

  return (
    <div className="ciPage">
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

      <div className="ciTabsWrap">
        <div className="anTabs">
          <button
            className={`anTab ${tab === 'analysis' ? 'anTab--active' : ''}`.trim()}
            onClick={() => {
              setTab('analysis');
              onGoToAnalysis();
            }}
            type="button"
          >
            Analys
          </button>
          <button
            className={`anTab ${tab === 'saved' ? 'anTab--active' : ''}`.trim()}
            onClick={() => setTab('saved')}
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

      <div className="ciBody">
        <div className="ciCard">
          <div className="ciTitle">Information om bilen</div>
          <div className="ciDesc">
            Fyll i så mycket information du vet om bilen. Ju mer information du anger, desto mer
            träffsäkra blir analyser.
          </div>

          <div className="ciGrid">
            <div className="ciField">
              <div className="ciLabel">Märke</div>
              {/* Användaren skriver själv. "datalist" ger bara förslag. */}
              <input
                className="ciInput"
                list="ci-makes"
                value={form.make}
                onChange={(e) => setField('make', e.target.value)}
                placeholder="T:ex Volvo"
              />
              <datalist id="ci-makes">
                {carInfo.makes.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>

            <div className="ciField">
              <div className="ciLabel">Modell</div>
              <input
                className="ciInput"
                value={form.model}
                onChange={(e) => setField('model', e.target.value)}
                placeholder="T:ex XC60"
              />
            </div>

            <div className="ciField">
              <div className="ciLabel">Årsmodell</div>
              <select className="ciSelect" value={form.year} onChange={(e) => setField('year', e.target.value)}>
                <option value="">Välj år</option>
                {renderOptions(carInfo.years)}
              </select>
            </div>

            <div className="ciField">
              <div className="ciLabel">Karosstyp</div>
              <select
                className="ciSelect"
                value={form.bodyType}
                onChange={(e) => setField('bodyType', e.target.value)}
              >
                <option value="">Välj karosstyp</option>
                {renderOptions(carInfo.bodyTypes)}
              </select>
            </div>

            <div className="ciField">
              <div className="ciLabel">Bränsle</div>
              <select className="ciSelect" value={form.fuel} onChange={(e) => setField('fuel', e.target.value)}>
                <option value="">Välj bränsle</option>
                {renderOptions(carInfo.fuels)}
              </select>
            </div>

            <div className="ciField">
              <div className="ciLabel">Växellåda</div>
              <select
                className="ciSelect"
                value={form.gearbox}
                onChange={(e) => setField('gearbox', e.target.value)}
              >
                <option value="">Välj växellåda</option>
                {renderOptions(carInfo.gearboxes)}
              </select>
            </div>

            <div className="ciField">
              <div className="ciLabel">Motorvolym</div>
              <div className="ciInline2">
                <input
                  className="ciInput"
                  value={form.engine}
                  onChange={(e) => setField('engine', e.target.value)}
                  placeholder="T:ex 2.0"
                />
                <div className="ciUnit">L</div>
              </div>
            </div>

            <div className="ciField">
              <div className="ciLabel">Effekt</div>
              <div className="ciInline2">
                <input
                  className="ciInput"
                  value={form.power}
                  onChange={(e) => setField('power', e.target.value)}
                  placeholder="T:ex 150"
                />
                <div className="ciUnit">hk</div>
              </div>
            </div>

            <div className="ciField">
              <div className="ciLabel">Miljöklass</div>
              <input
                className="ciInput"
                value={form.envClass}
                onChange={(e) => setField('envClass', e.target.value)}
                placeholder="T:ex Euro6"
              />
            </div>

            <div className="ciField">
              <div className="ciLabel">ungefärligt miltal</div>
              <div className="ciInline2">
                <input
                  className="ciInput"
                  value={form.mileage}
                  onChange={(e) => setField('mileage', e.target.value)}
                  placeholder="T:ex 12 000"
                />
                <div className="ciUnit">mil</div>
              </div>
            </div>
          </div>

          <div className="ciCenterRow">
            <div className="ciLabel" style={{ textAlign: 'center' }}>
              Nästa besiktning
            </div>
            <div className="ciNextInspect">
              <select
                className="ciSelect"
                value={form.nextInspectMonth}
                onChange={(e) => setField('nextInspectMonth', e.target.value)}
              >
                {carInfo.months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <select
                className="ciSelect"
                value={form.nextInspectYear}
                onChange={(e) => setField('nextInspectYear', e.target.value)}
              >
                {carInfo.inspectYears.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="ciLabel" style={{ textAlign: 'center', marginTop: 6 }}>
              Antal ägare
            </div>
            <div className="ciOwners">
              <button
                className="ciOwnerBtn"
                type="button"
                onClick={() => setField('owners', Math.max(0, form.owners - 1))}
              >
                −
              </button>
              <div className="ciOwnerVal">{form.owners}</div>
              <button className="ciOwnerBtn" type="button" onClick={() => setField('owners', form.owners + 1)}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ciBottom">
        <div className="ciBottomInner">
          <Button onClick={handleAnalyze}>Analysera</Button>
        </div>
      </div>
    </div>
  );
}

