import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/medicaments', label: 'Médicaments' },
  { to: '/stock', label: 'Stock' },
  { to: '/ventes', label: 'Ventes' },
  { to: '/fournisseurs', label: 'Fournisseurs' },
  { to: '/clients', label: 'Clients' },
];

function Layout() {
  const { logout } = useAuth();

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="logo">PharmaCare</h1>
        <nav>
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="logout-btn" onClick={logout}>Déconnexion</button>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
