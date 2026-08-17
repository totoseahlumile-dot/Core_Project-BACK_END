const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    let { username, email, password, roleId } = req.body;

    if (!username || !email || !password || !roleId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    username = username.trim();
    email = email.trim().toLowerCase();

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const userId = await User.create(username, email, password, roleId);
    res.status(201).json({ message: 'User registered successfully!', userId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed.', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    email = email.trim().toLowerCase();

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await User.comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.user_id, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ message: 'Login successful!', token, role: user.role_name });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.', details: error.message });
  }
};