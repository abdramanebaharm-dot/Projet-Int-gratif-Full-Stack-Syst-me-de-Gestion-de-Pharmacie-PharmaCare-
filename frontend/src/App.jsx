import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Login      from './pages/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Dashboard';
import Medicaments from './pages/Medicaments';
import Stock      from './pages/Stock';
import Ventes     from './pages/Ventes';

import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import './style.css';

/* ---------- Sidebar navigation ---------- */
const NAV_ITEMS = [
  { key: 'dashboard',   label: 'Tableau de bord', icon: '📊' },
  { key: 'medicaments', label: 'Médicaments',     icon: '💊' },
  { key: 'stock',       label: 'Stock',            icon: '📦' },
  { key: 'ventes',      label: 'Ventes',           icon: '🛒' },
];

function Sidebar({ active, onNav }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-label">Navigation</div>
      {NAV_ITEMS.map(item => (
        <div
          key={item.key}
          className={`sidebar-link ${active === item.key ? 'active' : ''}`}
          onClick={() => onNav(item.key)}
        >
          <span className="sidebar-link-icon">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </aside>
  );
}

/* ---------- Authenticated shell ---------- */
function AuthenticatedApp() {
  const [page, setPage] = useState('dashboard');

  const PAGE_MAP = {
    dashboard:   <Dashboard />,
    medicaments: <Medicaments />,
    stock:       <Stock />,
    ventes:      <Ventes />,
  };

  return (
    <DataProvider>
      <div className="app-shell">
        <Navbar />
        <Sidebar active={page} onNav={setPage} />
        <main className="main">
          {PAGE_MAP[page] || <Dashboard />}
        </main>
        <Footer />
      </div>
    </DataProvider>
  );
}

/* ---------- Auth gate ---------- */
function AppGate() {
  const { user, loading } = useAuth();
  const [authPage, setAuthPage] = useState('login');

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'var(--color-text-muted)' }}>
        Chargement…
      </div>
    );
  }

  if (!user) {
    return authPage === 'login'
      ? <Login    onGoRegister={() => setAuthPage('register')} />
      : <Register onGoLogin={() => setAuthPage('login')} />;
  }

  return <AuthenticatedApp />;
}

/* ---------- Root ---------- */
export default function App() {
  return (
    <AuthProvider>
      <AppGate />
    </AuthProvider>
  );
}
