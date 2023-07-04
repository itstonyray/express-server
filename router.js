const express = require('express');
const router = express.Router();


let tasks = [
  { id: 1, description: 'Buy groceries', completed: false },
  { id: 2, description: 'Walk the dog', completed: true },
  { id: 3, description: 'Go to gym', completed: false }
];

// Get all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// Get a single task
router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Create a new task
router.post('/', (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = { 
    id: tasks.length + 1, 
    description, 
    completed: false };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Update a task
router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { description, completed } = req.body;

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex].description = description || tasks[taskIndex].description;
  tasks[taskIndex].completed = completed !== undefined ? completed : tasks[taskIndex].completed;

  res.json(tasks[taskIndex]);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json({ message: 'Task deleted', task: deletedTask });
});

// List complete tasks
router.get('/complete', (req, res) => {
  const completeTasks = tasks.filter(task => task.completed);

  res.json(completeTasks);
});

// List incomplete tasks
router.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.completed);

  res.json(incompleteTasks);
});

module.exports = router;
