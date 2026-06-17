import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const EMPTY_FORM = { nom: '', categorie: '', prix: '', stock: '', seuil: '', expire: '', fournisseur: '' };

export default function Medicaments() {
  const { medicaments, addMedicament, updateMedicament, deleteMedicament } = useData();
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);  // null = add, obj = edit
  const [form, setForm]       = useState(EMPTY_FORM);
  const [success, setSuccess] = useState('');

  const filtered = medicaments.filter(m =>
    m.nom.toLowerCase().includes(search.toLowerCase()) ||
    m.categorie.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setModal(true); };
  const openEdit = (m) => {
    setEditing(m);
    setForm({ nom: m.nom, categorie: m.categorie, prix: m.prix, stock: m.stock, seuil: m.seuil, expire: m.expire, fournisseur: m.fournisseur });
    setModal(true);
  };

  const set = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    const data = { ...form, prix: +form.prix, stock: +form.stock, seuil: +form.seuil };
    if (editing) updateMedicament(editing.id, data);
    else         addMedicament(data);
    setModal(false);
    setSuccess(editing ? 'Médicament modifié.' : 'Médicament ajouté.');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id, nom) => {
    if (window.confirm(`Supprimer "${nom}" ?`)) {
      deleteMedicament(id);
      setSuccess('Médicament supprimé.');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const stockBadge = (m) => {
    if (m.stock === 0)         return <span className="badge badge-danger">Épuisé</span>;
    if (m.stock <= m.seuil)    return <span className="badge badge-warning">Critique</span>;
    return <span className="badge badge-success">OK</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Médicaments</h1>
          <p className="page-subtitle">{medicaments.length} références dans le catalogue</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Ajouter</button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      {/* Search */}
      <div className="search-bar mb-2">
        <span className="search-icon">🔍</span>
        <input
          className="form-control"
          placeholder="Rechercher par nom ou catégorie…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nom</th><th>Catégorie</th><th>Prix (FCFA)</th>
              <th>Stock</th><th>Seuil</th><th>Expiration</th>
              <th>Statut</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="8" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>Aucun médicament trouvé.</td></tr>
            )}
            {filtered.map(m => (
              <tr key={m.id}>
                <td style={{ fontWeight: 600 }}>{m.nom}</td>
                <td><span className="badge badge-info">{m.categorie}</span></td>
                <td className="text-accent">{m.prix.toLocaleString()}</td>
                <td>{m.stock}</td>
                <td className="text-muted">{m.seuil}</td>
                <td className="text-muted text-sm">{m.expire}</td>
                <td>{stockBadge(m)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => openEdit(m)}>✏️</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id, m.nom)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">{editing ? 'Modifier le médicament' : 'Nouveau médicament'}</span>
              <button className="modal-close" onClick={() => setModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              {[
                ['nom',         'Nom du médicament', 'text',   'ex: Paracétamol 500mg'],
                ['categorie',   'Catégorie',          'text',   'ex: Antibiotique'],
                ['prix',        'Prix (FCFA)',         'number', '0'],
                ['stock',       'Stock actuel',        'number', '0'],
                ['seuil',       'Seuil critique',      'number', '20'],
                ['expire',      "Date d'expiration",   'date',   ''],
                ['fournisseur', 'Fournisseur',          'text',  'Nom du fournisseur'],
              ].map(([field, label, type, placeholder]) => (
                <div className="form-group" key={field}>
                  <label className="form-label">{label}</label>
                  <input className="form-control" type={type} placeholder={placeholder}
                    value={form[field]} onChange={set(field)} required />
                </div>
              ))}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">
                  {editing ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
