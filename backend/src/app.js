import express from 'express';
import cors from 'cors';
import courseRoutes from './routes/courseRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

export default app;