const express = require('express');
const router = express.Router();


const tasks = require('./tasks.json');
console.log(tasks);


router.post('/', (req, res) => {
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


router.put('/:id', (req, res) => {
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

