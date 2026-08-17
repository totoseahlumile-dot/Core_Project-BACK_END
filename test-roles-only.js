import express from 'express';
import roleRoutes from './routes/roleRoutes.js';

const app = express();
app.use(express.json());

console.log('[ROLES ONLY SERVER]');
console.log('roleRoutes type:', typeof roleRoutes);
console.log('roleRoutes stack:', roleRoutes.stack ? roleRoutes.stack.length : 'no stack');

app.use('/api/roles', roleRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(3012, () => {
  console.log('Roles only server on 3012');
});
