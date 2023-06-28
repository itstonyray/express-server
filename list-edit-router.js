const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Array of predefined users
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

 
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware to protect the routes
function validateToken(req, res, next) {
  const Header = req.headers['authorization'];
  const token = Header && Header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

   
    req.user = user;
    next();
  });
}

// Protected route 
router.get('/protected', validateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});

module.exports = router;
