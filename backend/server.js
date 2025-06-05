const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const PORT = 3000;
const DATA_FILE = 'tasks.json';

app.use(cors());
app.use(express.json());

// Load tasks from file
function loadTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Save tasks to file
function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// Get all tasks
app.get('/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// Add a task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  const tasks = loadTasks();
  tasks.push({ title, description });
  saveTasks(tasks);
  res.status(201).json({ message: 'Task added successfully.' });
});

// Delete a task by index
app.delete('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const tasks = loadTasks();

  if (index < 0 || index >= tasks.length) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks.splice(index, 1);
  saveTasks(tasks);
  res.json({ message: 'Task deleted successfully.' });
});

// Update a task by index
app.put('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const { title, description } = req.body;
  const tasks = loadTasks();

  if (index < 0 || index >= tasks.length) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks[index].title = title || tasks[index].title;
  tasks[index].description = description || tasks[index].description;
  saveTasks(tasks);
  res.json({ message: 'Task updated successfully.' });
});

// Clear all tasks
app.delete('/tasks', (req, res) => {
  saveTasks([]);
  res.json({ message: 'All tasks cleared successfully.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
