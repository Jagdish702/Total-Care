require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const morgan       = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const apiRoutes    = require('./routes/index');

const app = express();

// ── CORS ───────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body parsers ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── HTTP logger ────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Health check ───────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// ── API routes ─────────────────────────────────────────────────
app.use('/api', apiRoutes);

// ── 404 handler ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ── Global error handler ───────────────────────────────────────
app.use(errorHandler);

module.exports = app;
