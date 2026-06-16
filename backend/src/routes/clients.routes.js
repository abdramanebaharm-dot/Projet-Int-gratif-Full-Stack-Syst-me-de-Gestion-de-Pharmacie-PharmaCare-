const express = require('express');
const router = express.Router();

// TODO Étudiant 2: CRUD clients + historique achats + fidélisation
router.get('/', (_req, res) => {
  res.json({ message: 'Route clients — à implémenter par l\'Étudiant 2' });
});

module.exports = router;
