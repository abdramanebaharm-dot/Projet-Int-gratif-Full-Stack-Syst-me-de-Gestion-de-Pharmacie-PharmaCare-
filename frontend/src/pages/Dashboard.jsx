import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';
import { VentesAreaChart, StockBarChart } from '../components/Graph';

export default function Dashboard() {
  const { stats, medicaments, ventes } = useData();
  const { user } = useAuth();

  const recentVentes = [...ventes].reverse().slice(0, 5);
  const critiques    = medicaments.filter(m => m.stock <= m.seuil);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Tableau de bord</h1>
          <p className="page-subtitle">
            Bonjour, <strong>{user?.name}</strong> — {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <StatsCard
          label="Médicaments"
          value={stats.totalMedicaments}
          icon="💊"
          color="var(--color-accent)"
          trend="Catalogue actif"
          trendUp
          sub="références"
        />
        <StatsCard
          label="Stock critique"
          value={stats.stockCritique}
          icon="⚠️"
          color="var(--color-warning)"
          trend={stats.stockCritique > 0 ? 'Réapprovisionner' : 'Tout OK'}
          trendUp={stats.stockCritique === 0}
          sub="produits"
        />
        <StatsCard
          label="Ventes totales"
          value={ventes.length}
          icon="🛒"
          color="#818CF8"
          trend="+3 cette semaine"
          trendUp
          sub="transactions"
        />
        <StatsCard
          label="Chiffre d'affaires"
          value={`${(stats.chiffreAffaires / 1000).toFixed(0)}k`}
          icon="💰"
          color="var(--color-success)"
          trend="+8%"
          trendUp
          sub="FCFA"
        />
      </div>

      {/* Charts */}
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <VentesAreaChart data={stats.ventesParJour} />
        <StockBarChart data={medicaments.slice(0, 6)} />
      </div>

      {/* Two columns : recent ventes + alertes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Recent ventes */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '1.25rem' }}>
            🛒 Dernières ventes
          </h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Médicament</th>
                  <th>Qté</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentVentes.map(v => (
                  <tr key={v.id}>
                    <td>{v.medicament}</td>
                    <td>{v.quantite}</td>
                    <td className="text-accent">{v.total.toLocaleString()} FCFA</td>
                    <td className="text-muted text-sm">{v.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertes stock */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '1.25rem' }}>
            ⚠️ Alertes de stock
          </h3>
          {critiques.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--color-success)', padding: '2rem 0' }}>
              ✅ Tous les stocks sont suffisants.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {critiques.map(m => (
                <div key={m.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.75rem 1rem',
                  background: 'rgba(248,113,113,0.07)',
                  border: '1px solid rgba(248,113,113,0.2)',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{m.nom}</div>
                    <div className="text-muted text-sm">{m.categorie}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-danger">{m.stock} / {m.seuil}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
