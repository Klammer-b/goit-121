import 'dotenv/config';

import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

function auth(req, res, next) {
  if (req.query['api-key'] !== process.env.API_KEY) {
    res.status(401).json({ message: 'Please provide API key' });
    return;
  }

  next();
}

app.use((_req, _res, next) => {
  console.log('Middleware 2');
  next();
});

app.use('/notes', auth);

app.get('/', (_req, res) => {
  res.json({ message: 'Hello, Express!' });
});

app.get('/health', (_req, res) => {
  res.json({ message: 'OK' });
});

app.get('/notes', (_req, res) => {
  res.json({
    data: [
      { id: 1, title: 'Note 1' },
      { id: 2, title: 'Note 2' },
    ],
  });
});

app.get('/notes/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Please provide a valid id' });
    return;
  }

  res.json({
    data: { id, title: `Title ${id}` },
  });
});

// Not found handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = Number.parseInt(process.env.PORT, 10) || 8080;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server started on port ${PORT}`);
});
