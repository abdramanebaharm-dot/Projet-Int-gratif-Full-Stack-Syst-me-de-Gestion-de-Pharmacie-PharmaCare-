import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { StockBarChart } from '../components/Graph';

export default function Stock() {
  const { medicaments, updateMedicament } = useData();
  const [filter, setFilter] = useState('all');
  const [reapModal, setReapModal] = useState(null);
  const [qty, setQty]             = useState('');
  const [success, setSuccess]     = useState('');

  const filtered = medicaments.filter(m => {
    if (filter === 'critique') return m.stock <= m.seuil;
    if (filter === 'epuise')   return m.stock === 0;
    return true;
  });

  const handleReap = (e) => {
    e.preventDefault();
    if (!reapModal || !qty) return;
    updateMedicament(reapModal.id, { stock: reapModal.stock + +qty });
    setSuccess(`Stock de "${reapModal.nom}" mis à jour (+${qty}).`);
    setTimeout(() => setSuccess(''), 3000);
    setReapModal(null);
    setQty('');
  };

  const pct = (m) => Math.min(100, Math.round((m.stock / Math.max(m.seuil * 2, 1)) * 100));

  const barColor = (m) => {
    if (m.stock === 0)      return 'var(--color-danger)';
    if (m.stock <= m.seuil) return 'var(--color-warning)';
    return 'var(--color-accent)';
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion du stock</h1>
          <p className="page-subtitle">Suivi et réapprovisionnement des médicaments</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'critique', 'epuise'].map(f => (
            <button
              key={f}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Tous' : f === 'critique' ? '⚠️ Critique' : '❌ Épuisé'}
            </button>
          ))}
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      {/* Summary cards */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Total produits',    value: medicaments.length,                                   color: 'var(--color-accent)',   icon: '📦' },
          { label: 'Stock suffisant',   value: medicaments.filter(m => m.stock > m.seuil).length,    color: 'var(--color-success)',  icon: '✅' },
          { label: 'Stock critique',    value: medicaments.filter(m => m.stock <= m.seuil && m.stock > 0).length, color: 'var(--color-warning)', icon: '⚠️' },
          { label: 'Produits épuisés',  value: medicaments.filter(m => m.stock === 0).length,        color: 'var(--color-danger)',   icon: '❌' },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2rem', width: '48px', textAlign: 'center' }}>{icon}</div>
            <div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ marginBottom: '2rem' }}>
        <StockBarChart data={medicaments} />
      </div>

      {/* Stock list */}
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '1.5rem' }}>
          Détail des stocks
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(m => (
            <div key={m.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 120px 120px auto',
              alignItems: 'center', gap: '1rem',
              padding: '1rem',
              background: 'var(--color-surface-2)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${m.stock === 0 ? 'rgba(248,113,113,0.3)' : m.stock <= m.seuil ? 'rgba(251,191,36,0.3)' : 'var(--color-border)'}`,
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{m.nom}</div>
                <div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--color-border)', borderRadius: 3, marginTop: '0.4rem', overflow: 'hidden' }}>
                    <div style={{ width: `${pct(m)}%`, height: '100%', background: barColor(m), borderRadius: 3, transition: 'width 0.4s' }} />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: barColor(m) }}>{m.stock}</div>
                <div className="text-muted text-sm">unités</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text-muted)' }}>{m.seuil}</div>
                <div className="text-muted text-sm">seuil</div>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => { setReapModal(m); setQty(''); }}>
                ➕ Réappro.
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
              Aucun médicament dans cette catégorie.
            </div>
          )}
        </div>
      </div>

      {/* Modal réapprovisionnement */}
      {reapModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setReapModal(null); }}>
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">Réapprovisionner</span>
              <button className="modal-close" onClick={() => setReapModal(null)}>✕</button>
            </div>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>
              Stock actuel de <strong>{reapModal.nom}</strong> : <strong>{reapModal.stock}</strong> unités
            </p>
            <form onSubmit={handleReap}>
              <div className="form-group">
                <label className="form-label">Quantité à ajouter</label>
                <input className="form-control" type="number" min="1" placeholder="ex: 50"
                  value={qty} onChange={e => setQty(e.target.value)} required autoFocus />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setReapModal(null)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Confirmer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
