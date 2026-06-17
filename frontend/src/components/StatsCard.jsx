import React from 'react';

/**
 * Props:
 *  - label    : string   — titre de la carte
 *  - value    : string   — valeur principale
 *  - icon     : string   — emoji ou texte
 *  - color    : string   — couleur CSS de l'accent bar / icon bg
 *  - trend    : string   — ex: "+12%" ou "-5%"
 *  - trendUp  : bool     — true = vert, false = rouge
 *  - sub      : string   — texte secondaire
 */
export default function StatsCard({ label, value, icon, color = 'var(--color-accent)', trend, trendUp, sub }) {
  return (
    <div className="stats-card">
      {/* Accent bar at top */}
      <div className="stats-card-accent-bar" style={{ background: color }} />

      <div className="stats-card-header">
        <span className="stats-card-label">{label}</span>
        <div
          className="stats-card-icon"
          style={{ background: `${color}22`, color }}
        >
          {icon}
        </div>
      </div>

      <div className="stats-card-value">{value}</div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {trend && (
          <span className={`stats-card-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
        {sub && <span className="text-muted text-sm">{sub}</span>}
      </div>
    </div>
  );
}
