const express = require('express');
const router = express.Router();

const tasks = require('./tasks.json');


const validatePostRequest = (req, res, next) => {
  if (req.method === 'POST') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Empty request body' });
    }

    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Invalid or missing task description' });
    }
  }

  next();
};


const validatePutRequest = (req, res, next) => {
  if (req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Empty request body' });
    }

    const { description, isCompleted } = req.body;
    if (!description && !isCompleted) {
      return res.status(400).json({ error: 'Invalid or missing task information' });
    }
  }

  next();
};

router.post('/', validatePostRequest, (req, res) => {
  const { description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    description,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);

  res.json({ message: 'Task deleted' });
});

router.put('/:id', validatePutRequest, (req, res) => {
  const taskId = parseInt(req.params.id);
  const { description, completed } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex].description = description || tasks[taskIndex].description;
  tasks[taskIndex].completed = completed || tasks[taskIndex].completed;

  res.json(tasks[taskIndex]);
});

module.exports = router;