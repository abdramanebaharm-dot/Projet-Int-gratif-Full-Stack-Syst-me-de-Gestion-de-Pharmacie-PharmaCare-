import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Brand */}
      <div className="navbar-brand">
        <div className="navbar-brand-icon">💊</div>
        <span>PharmaGest</span>
      </div>

      {/* Actions */}
      <div className="navbar-actions">
        {/* Notification bell */}
        <div className="navbar-notification" title="Notifications">
          🔔
          <span className="notif-dot" />
        </div>

        {/* Avatar + dropdown */}
        {user && (
          <div style={{ position: 'relative' }}>
            <div
              className="navbar-avatar"
              onClick={() => setDropdownOpen(o => !o)}
              title={user.name}
            >
              {user.initials}
            </div>

            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 0',
                minWidth: '180px',
                boxShadow: 'var(--shadow-card)',
                zIndex: 300,
              }}>
                <div style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>{user.role}</div>
                </div>
                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  style={{
                    width: '100%', padding: '0.6rem 1rem',
                    background: 'none', border: 'none',
                    color: 'var(--color-danger)',
                    textAlign: 'left', cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  🚪 Déconnexion
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
