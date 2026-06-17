import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onGoRegister }) {
  const { login } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) setError(res.message);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">💊</div>
          <span className="auth-logo-text">PharmaGest</span>
        </div>

        <h1 className="auth-title">Connexion</h1>
        <p className="auth-subtitle">Accédez à votre espace de gestion.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Adresse e-mail</label>
            <input
              className="form-control"
              type="email"
              placeholder="exemple@pharmacie.td"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input
              className="form-control"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-full mt-1" type="submit" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="auth-footer">
          Pas encore de compte ?{' '}
          <span
            onClick={onGoRegister}
            style={{ color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600 }}
          >
            Créer un compte
          </span>
        </p>
      </div>
    </div>
  );
}
