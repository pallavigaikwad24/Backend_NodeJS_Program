const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory array to store tasks
let tasks = [];
let idCounter = 1;

// 📌 Create Task - POST /api/tasks
app.post('/api/tasks', (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const newTask = {
      id: idCounter++,
      title,
      description,
      status: status || 'pending',
      dueDate
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// 📌 Get All Tasks - GET /api/tasks
app.get('/api/tasks', (req, res, next) => {
  try {
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// 📌 Get Task by ID - GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res, next) => {
  try {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// 📌 Update Task - PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res, next) => {
  try {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, status, dueDate } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    res.json(task);
  } catch (err) {
    next(err);
  }
});

// 📌 Delete Task - DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res, next) => {
  try {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted', task: deletedTask[0] });
  } catch (err) {
    next(err);
  }
});

// ❗ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// 🔥 Start Server
app.listen(PORT, () => {
  console.log(`✅ Task Manager API is running at http://localhost:${PORT}`);
});
