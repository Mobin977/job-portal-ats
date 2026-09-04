import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/job.js';
import applicationRoutes from './routes/application.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();
const port = process.env['PORT'] || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Points directly to your Vite frontend server url
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// Application Routing Matrix
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`[SYSTEM RUNTIME]: Server successfully operating on network port ${port}`);
});
