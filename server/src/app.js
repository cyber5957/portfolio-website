import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { portfolioRouter } from './routes/portfolioRoutes.js';
import { contactRouter } from './routes/contactRoutes.js';

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use(express.static(clientDistPath));

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'portfolio-api'
  });
});

app.use('/api/portfolio', portfolioRouter);
app.use('/api/contact', contactRouter);

app.get('*', (_request, response, next) => {
  if (path.resolve(clientDistPath)) {
    return response.sendFile(path.join(clientDistPath, 'index.html'));
  }
  return next();
});

app.use((_request, response) => {
  response.status(404).json({
    message: 'Route not found'
  });
});
