const express = require('express');
const router = express.Router();

// TODO Étudiant 2: CRUD fournisseurs + historique commandes
router.get('/', (_req, res) => {
  res.json({ message: 'Route fournisseurs — à implémenter par l\'Étudiant 2' });
});

module.exports = router;
