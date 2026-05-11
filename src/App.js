import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import KopProfilPage from './components/KopProfilPage';
import AnalysisPage from './components/AnalysisPage';
import AnalysisResultPage from './components/AnalysisResultPage';
import CarInfoPage from './components/CarInfoPage';
import SavedAnalysesPage from './components/SavedAnalysesPage';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import GdprPage from './components/GdprPage';
import GuidePage from './components/GuidePage';
import mockData from './mock-data/mockData.json';

// Auth “globalt” i appen (mock). Senare kan detta flyttas till riktig backend.
const AuthContext = React.createContext(null);

function RequireAuth({ children }) {
  const auth = React.useContext(AuthContext);
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function AppShell({ children }) {
  return (
    <div style={{ minHeight: '100%', display: 'grid', gridTemplateRows: '1fr auto' }}>
      <div style={{ minHeight: 0 }}>{children}</div>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  const [profileAnswers, setProfileAnswers] = React.useState(null);

  // Nybörjar-tänk:
  // "Tillbaka" på infosidor ska alltid gå till en trygg startpunkt,
  // inte stegvis bakåt i historiken.
  const fixedBackPath = auth.user ? '/analys' : '/signin';

  function logout() {
    auth.setUser(null);
    setProfileAnswers(null);
    navigate('/signin');
  }

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/signin"
        element={
          <AppShell>
            {auth.user ? (
              <Navigate to="/analys" replace />
            ) : (
              <LoginPage
                onLoggedIn={(u) => {
                  auth.setUser(u);
                  navigate('/kopsprofil');
                }}
              />
            )}
          </AppShell>
        }
      />

      {/* Köpsprofil */}
      <Route
        path="/kopsprofil"
        element={
          <RequireAuth>
            <AppShell>
              <KopProfilPage
                user={auth.user}
                onGoToAnalysis={() => navigate('/analys')}
                onGoToSaved={() => navigate('/sparade')}
                onOpenInfo={(id) => navigate(id === 'about' ? '/omoss' : '/guide')}
                onLogout={logout}
                onSaved={(answers) => {
                  setProfileAnswers(answers);
                  navigate('/analys');
                }}
              />
            </AppShell>
          </RequireAuth>
        }
      />

      {/* Analys (slå in regnummer) */}
      <Route
        path="/analys"
        element={
          <RequireAuth>
            <AppShell>
              <AnalysisPage
                profileAnswers={profileAnswers}
                onGoToProfile={() => navigate('/kopsprofil')}
                onGoToSaved={() => navigate('/sparade')}
                onOpenInfo={(id) => navigate(id === 'about' ? '/omoss' : '/guide')}
                onNoReg={() => navigate('/bilinfo')}
                onShowMockResult={(regUpper) => {
                  // Resultatet laddas på resultat-sidan (mockData/localStorage),
                  // men vi navigerar till en route med regnummer i URL:en.
                  navigate(`/analys/resultat/${encodeURIComponent(regUpper)}`);
                }}
                onLogout={logout}
              />
            </AppShell>
          </RequireAuth>
        }
      />

      <Route
        path="/analys/resultat/:reg"
        element={
          <RequireAuth>
            <AppShell>
              <AnalysisResultPage
                getMockResult={(regUpper) => mockData.analysisMock?.[regUpper] || null}
                onOpenInfo={(id) => navigate(id === 'about' ? '/omoss' : '/guide')}
                onGoToProfile={() => navigate('/kopsprofil')}
                onGoToSaved={() => navigate('/sparade')}
                onGoToAnalyzeAnother={() => {
                  navigate('/analys');
                }}
                onLogout={logout}
              />
            </AppShell>
          </RequireAuth>
        }
      />

      <Route
        path="/sparade"
        element={
          <RequireAuth>
            <AppShell>
              <SavedAnalysesPage
                onGoToAnalysis={() => navigate('/analys')}
                onGoToProfile={() => navigate('/kopsprofil')}
                onOpenReport={(reg) => navigate(`/analys/resultat/${encodeURIComponent(reg)}`)}
                onOpenInfo={(id) => navigate(id === 'about' ? '/omoss' : '/guide')}
                onLogout={logout}
              />
            </AppShell>
          </RequireAuth>
        }
      />

      {/* Bilinfo (om man saknar regnummer) */}
      <Route
        path="/bilinfo"
        element={
          <RequireAuth>
            <AppShell>
              <CarInfoPage
                onGoToAnalysis={() => navigate('/analys')}
                onGoToProfile={() => navigate('/kopsprofil')}
                onOpenInfo={(id) => navigate(id === 'about' ? '/omoss' : '/guide')}
                onLogout={logout}
              />
            </AppShell>
          </RequireAuth>
        }
      />

      {/* Info-sidor (får ha URL även om man inte är inloggad) */}
      <Route
        path="/omoss"
        element={
          <AppShell>
            <AboutPage
              onBack={() => navigate(fixedBackPath, { replace: true })}
              onContact={() => navigate('/kontakt')}
              onGoToAnalysis={auth.user ? () => navigate('/analys') : undefined}
            />
          </AppShell>
        }
      />
      <Route
        path="/kontakt"
        element={
          <AppShell>
            <ContactPage onBack={() => navigate(fixedBackPath, { replace: true })} />
          </AppShell>
        }
      />
      <Route
        path="/gdpr"
        element={
          <AppShell>
            <GdprPage onBack={() => navigate(fixedBackPath, { replace: true })} />
          </AppShell>
        }
      />
      <Route
        path="/guide"
        element={
          <AppShell>
            <GuidePage onBack={() => navigate(fixedBackPath, { replace: true })} />
          </AppShell>
        }
      />

      {/* Default */}
      <Route path="/" element={<Navigate to={auth.user ? '/analys' : '/signin'} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  /**
   * App = appens "rot-komponent".
   * Nybörjar-tänk: BrowserRouter gör att vi kan ha riktiga URL:er.
   */
  const [user, setUser] = React.useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
