import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register({ onGoLogin }) {
  const { register } = useAuth();
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (form.password.length < 6)       { setError('Mot de passe trop court (min. 6 caractères).'); return; }
    setLoading(true);
    const res = await register(form.name, form.email, form.password);
    setLoading(false);
    if (!res.success) setError(res.message);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">💊</div>
          <span className="auth-logo-text">PharmaGest</span>
        </div>

        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-subtitle">Rejoignez votre équipe pharmaceutique.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nom complet</label>
            <input className="form-control" type="text" placeholder="Votre nom" value={form.name} onChange={set('name')} required />
          </div>
          <div className="form-group">
            <label className="form-label">Adresse e-mail</label>
            <input className="form-control" type="email" placeholder="exemple@pharmacie.td" value={form.email} onChange={set('email')} required />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input className="form-control" type="password" placeholder="Min. 6 caractères" value={form.password} onChange={set('password')} required />
          </div>
          <div className="form-group">
            <label className="form-label">Confirmer le mot de passe</label>
            <input className="form-control" type="password" placeholder="Répétez le mot de passe" value={form.confirm} onChange={set('confirm')} required />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
            {loading ? 'Création…' : "Créer le compte"}
          </button>
        </form>

        <p className="auth-footer">
          Déjà un compte ?{' '}
          <span onClick={onGoLogin} style={{ color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600 }}>
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}
