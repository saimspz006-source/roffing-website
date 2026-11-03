import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Determine port:
// - In AI Studio dev container, DEFAULT_APP_PORT is 3000 (nginx is on 8080)
// - In standalone production Cloud Run, PORT is usually 8080
// - Default to 3000 if not specified
const initialPort = Number(process.env.DEFAULT_APP_PORT || process.env.PORT || 3000);
const distPath = path.resolve(__dirname, 'dist');

app.use(express.json());

// API health endpoint for deployment probes / uptime checks
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

// Serve compiled static assets
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1d' }));

  // SPA fallback for all HTML routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.status(503).send('Application is starting. Please build the client first with `npm run build`.');
  });
}

function startServer(portToTry: number) {
  const server = app.listen(portToTry, '0.0.0.0', () => {
    console.log(`Summit Pro Roofing server running on http://0.0.0.0:${portToTry}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE' && portToTry !== 3000) {
      console.warn(`Port ${portToTry} in use, falling back to port 3000...`);
      startServer(3000);
    } else {
      console.error('Server listen error:', err);
      process.exit(1);
    }
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received: closing HTTP server');
    server.close(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received: closing HTTP server');
    server.close(() => process.exit(0));
  });
}

startServer(initialPort);
