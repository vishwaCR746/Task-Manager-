// src/api/task.js
import API from './index';

// Get all tasks
export const getTasks = () => API.get('/tasks');

// Get task statistics
export const getTaskStats = () => API.get('/tasks/stats');

// Create a new task
export const createTask = (taskData) => API.post('/tasks', taskData);

// Update a task's full data (e.g., title, description, status, priority, pinned)
export const updateTask = (id, updateData) => API.put(`/tasks/${id}`, updateData);

// Mark task complete/incomplete (just status)
export const toggleComplete = (id, status) => API.put(`/tasks/${id}`, { status });

// Pin or unpin a task
export const togglePin = (id, pinned) => API.put(`/tasks/${id}`, { pinned });

// Delete task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
