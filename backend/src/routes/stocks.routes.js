const express = require('express');
const router = express.Router();

// TODO Étudiant 2: Entrées, sorties, ajustements, historique, alertes
router.get('/', (_req, res) => {
  res.json({ message: 'Route stocks — à implémenter par l\'Étudiant 2' });
});

module.exports = router;
