import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span>© {year} <strong style={{ color: 'var(--color-accent)' }}>PharmaGest</strong> — Gestion Pharmaceutique</span>
      <span style={{ display: 'flex', gap: '1.5rem' }}>
        <span>v1.0.0</span>
        <span>Chad 🇹🇩</span>
      </span>
    </footer>
  );
}
