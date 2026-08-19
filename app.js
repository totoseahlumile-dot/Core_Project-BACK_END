const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.use('/api/auth', authRoutes);

app.get('/api/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

app.get('/api/admin-only', authenticateToken, authorizeRoles('Admin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});