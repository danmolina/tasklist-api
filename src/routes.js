const express = require('express');

// Require the routes
const getTasksRoutes = require('./app/tasks/routes');

const router = express.Router();

// Set the routes
router.use('/tasks', getTasksRoutes);

module.exports = router;