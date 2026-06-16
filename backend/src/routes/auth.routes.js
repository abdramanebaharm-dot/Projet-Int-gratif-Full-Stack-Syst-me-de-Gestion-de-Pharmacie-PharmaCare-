const express = require('express');
const router = express.Router();

// TODO Étudiant 2: POST /register, POST /login, POST /logout, POST /reset-password
router.get('/', (_req, res) => {
  res.json({ message: 'Route auth — à implémenter par l\'Étudiant 2' });
});

module.exports = router;
