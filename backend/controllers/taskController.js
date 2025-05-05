// server/controllers/taskController.js
import Task from '../models/Task.js';

// Get All Tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort('-date');
  res.json(tasks);
};

// Get Task Stats
export const getTaskStats = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  const total = tasks.length;
  const completed = tasks.filter(t => t.status).length;
  const open = total - completed;
  res.json({ total, completed, open });
};

// Create Task
export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.status(201).json(task);
};

// Update Task
export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
};

// Delete Task
export const deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ success: true });
};
