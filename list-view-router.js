const express = require('express');
const router = express.Router();


const tasks = require('./tasks.json');

// Middleware to handle parameter validation
const validateParameters = (req, res, next) => {
  const { param1, param2 } = req.params;
  if (!param1 || !param2) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  next();
};


router.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);

  res.json(completedTasks);
});


router.get('/incomplete', validateParameters,(req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);

  res.json(incompleteTasks);
});

module.exports = router;


