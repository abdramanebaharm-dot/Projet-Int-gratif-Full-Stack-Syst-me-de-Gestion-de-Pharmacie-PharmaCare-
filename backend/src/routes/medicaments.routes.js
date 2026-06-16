const express = require('express');
const router = express.Router();

// TODO Étudiant 2: CRUD médicaments (PHARMACIEN, ADMIN)
router.get('/', (_req, res) => {
  res.json({ message: 'Route medicaments — à implémenter par l\'Étudiant 2' });
});

module.exports = router;
