// src/routes/taskRoutes.js
import express from 'express';
import { updateTaskStatus } from '../controllers/taskController.js';

const router = express.Router();

// Update task status
router.put('/tasks/:id/status', updateTaskStatus);

export default router;
