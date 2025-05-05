// server/routes/tasks.js
import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort('-date');
  res.json(tasks);
});

// Get task stats
router.get('/stats', async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  const total = tasks.length;
  const completed = tasks.filter(t => t.status).length;
  const open = total - completed;
  res.json({ total, completed, open });
});

// Create task
router.post('/', async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.status(201).json(task);
});

// Update task
router.put('/:id', async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ success: true });
});

export default router;
