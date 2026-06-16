function PlaceholderPage({ title, student }) {
  return (
    <div className="container">
      <h1 className="page-title">{title}</h1>
      <div className="card placeholder">
        <p>Page <strong>{title}</strong> — à implémenter par l&apos;{student}</p>
        <p>Voir <code>docs/ETUDIANT-1-FRONTEND.md</code> pour les instructions.</p>
      </div>
    </div>
  );
}

export default PlaceholderPage;
