require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Sentry = require('@sentry/node');

const { errorHandler } = require('./middlewares/errorHandler');

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 0.1,
  });
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PharmaCare API', timestamp: new Date().toISOString() });
});

// Routes à implémenter par l'Étudiant 2
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/medicaments', require('./routes/medicaments.routes'));
app.use('/api/stocks', require('./routes/stocks.routes'));
app.use('/api/ventes', require('./routes/ventes.routes'));
app.use('/api/fournisseurs', require('./routes/fournisseurs.routes'));
app.use('/api/clients', require('./routes/clients.routes'));

if (process.env.SENTRY_DSN) {
  Sentry.setupExpressErrorHandler(app);
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`PharmaCare API démarrée sur le port ${PORT}`);
});
