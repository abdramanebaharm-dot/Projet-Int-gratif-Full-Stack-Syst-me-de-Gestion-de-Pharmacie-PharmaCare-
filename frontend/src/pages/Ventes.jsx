import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { VentesAreaChart } from '../components/Graph';

const EMPTY_FORM = { medicament: '', quantite: '', client: '' };

export default function Ventes() {
  const { ventes, medicaments, addVente, stats } = useData();
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState(EMPTY_FORM);
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState('');

  const set = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = addVente({
      ...form,
      quantite: +form.quantite,
      date: new Date().toISOString().slice(0, 10),
      vendeur: 'Admin',
    });
    if (!res.success) { setError(res.message); return; }
    setModal(false);
    setForm(EMPTY_FORM);
    setSuccess('Vente enregistrée avec succès.');
    setTimeout(() => setSuccess(''), 3000);
  };

  const selectedMed = medicaments.find(m => m.nom === form.medicament);
  const totalEstime = selectedMed && form.quantite ? (selectedMed.prix * +form.quantite).toLocaleString() + ' FCFA' : '—';

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Ventes</h1>
          <p className="page-subtitle">{ventes.length} transaction(s) enregistrée(s)</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setModal(true); setError(''); setForm(EMPTY_FORM); }}>
          + Nouvelle vente
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      {/* Chart */}
      <div style={{ marginBottom: '2rem' }}>
        <VentesAreaChart data={stats.ventesParJour} />
      </div>

      {/* Summary */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 1, minWidth: 160, textAlign: 'center' }}>
          <div className="text-muted text-sm">Chiffre d'affaires</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-success)' }}>
            {(stats.chiffreAffaires / 1000).toFixed(1)}k FCFA
          </div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 160, textAlign: 'center' }}>
          <div className="text-muted text-sm">Nombre de ventes</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-accent)' }}>
            {ventes.length}
          </div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 160, textAlign: 'center' }}>
          <div className="text-muted text-sm">Panier moyen</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#818CF8' }}>
            {ventes.length ? Math.round(stats.chiffreAffaires / ventes.length).toLocaleString() : 0} FCFA
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th><th>Date</th><th>Médicament</th><th>Client</th>
              <th>Qté</th><th>Total (FCFA)</th><th>Vendeur</th>
            </tr>
          </thead>
          <tbody>
            {[...ventes].reverse().map((v, i) => (
              <tr key={v.id}>
                <td className="text-muted">{ventes.length - i}</td>
                <td className="text-muted text-sm">{v.date}</td>
                <td style={{ fontWeight: 600 }}>{v.medicament}</td>
                <td>{v.client}</td>
                <td>{v.quantite}</td>
                <td className="text-accent font-bold">{v.total.toLocaleString()}</td>
                <td className="text-muted">{v.vendeur}</td>
              </tr>
            ))}
            {ventes.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>Aucune vente enregistrée.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">Nouvelle vente</span>
              <button className="modal-close" onClick={() => setModal(false)}>✕</button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Médicament</label>
                <select className="form-control" value={form.medicament} onChange={set('medicament')} required>
                  <option value="">— Sélectionner —</option>
                  {medicaments.filter(m => m.stock > 0).map(m => (
                    <option key={m.id} value={m.nom}>{m.nom} (stock : {m.stock})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantité</label>
                <input className="form-control" type="number" min="1"
                  max={selectedMed?.stock || 9999}
                  placeholder="ex: 5"
                  value={form.quantite} onChange={set('quantite')} required />
              </div>
              <div className="form-group">
                <label className="form-label">Nom du client</label>
                <input className="form-control" type="text" placeholder="ex: Ali Hassan"
                  value={form.client} onChange={set('client')} required />
              </div>
              {form.medicament && form.quantite && (
                <div style={{
                  background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)',
                  borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1rem',
                }}>
                  <span className="text-muted text-sm">Total estimé : </span>
                  <strong className="text-accent">{totalEstime}</strong>
                </div>
              )}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Confirmer la vente</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
