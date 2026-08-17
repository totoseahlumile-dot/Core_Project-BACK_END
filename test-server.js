import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.error('[MIDDLEWARE] ' + req.method + ' ' + req.path);
  next();
});

app.get('/api/test', (req, res) => {
  res.json({ ok: true });
});

app.use((req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(3011, () => {
  console.log('Test server on 3011');
});
