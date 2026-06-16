const express = require('express');
const router = express.Router();

// TODO Étudiant 2: Création facture, vente rapide, recherche produit
router.get('/', (_req, res) => {
  res.json({ message: 'Route ventes — à implémenter par l\'Étudiant 2' });
});

module.exports = router;
