import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

/* ---------- Custom Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--color-surface-2)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      padding: '0.6rem 1rem',
      fontSize: '0.8rem',
    }}>
      <div style={{ color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name} : {typeof p.value === 'number' ? p.value.toLocaleString() : p.value} FCFA
        </div>
      ))}
    </div>
  );
};

/* ---------- Area (Ventes) ---------- */
export function VentesAreaChart({ data }) {
  return (
    <div className="graph-card">
      <div className="graph-card-title">📈 Évolution des ventes (FCFA)</div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="ventesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#0D9488" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#0D9488" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false}
                 tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#0D9488"
            strokeWidth={2.5}
            fill="url(#ventesGrad)"
            name="Ventes"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------- Bar (Stock) ---------- */
export function StockBarChart({ data }) {
  return (
    <div className="graph-card">
      <div className="graph-card-title">📦 Niveaux de stock</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="nom" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false}
                 tickFormatter={v => v.length > 12 ? v.slice(0, 12) + '…' : v} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '0.8rem', color: '#94A3B8' }} />
          <Bar dataKey="stock" name="Stock" fill="#0D9488" radius={[4, 4, 0, 0]} />
          <Bar dataKey="seuil" name="Seuil"  fill="#FBBF24" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* Default export = Area chart */
export default VentesAreaChart;
