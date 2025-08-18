// filepath: c:\Users\user\Desktop\WebStorm\SkipliBoardManagement\routes\task.js
const express = require('express');
const router = express.Router({mergeParams: true});
const taskController = require('../src/controllers/task.controller');

// Retrieve all tasks of a card
router.get('/', (req, res) => {
    return taskController.findAll(req, res);
});

// Create a new task within a card
router.post('/', (req, res) => {
    return taskController.create(req, res);
});

// Retrieve task details within a card
router.get('/:taskId', (req, res) => {
    return taskController.findOne(req, res);
});

// Update task details within a card
router.put('/:taskId', (req, res) => {
    return taskController.update(req, res);
});

// Delete a task within a card
router.delete('/:taskId', (req, res) => {
    return taskController.delete(req, res);
});

// Assign member to a task
router.post('/:taskId/assign', (req, res) => {
    return taskController.assignMember(req, res);
});

// Retrieve assigned members of a task
router.get('/:taskId/assign', (req, res) => {
    return taskController.getAssignedMembers(req, res);
});

// Remove member assignment from a task
router.delete('/:taskId/assign/:memberId', (req, res) => {
    return taskController.removeAssignment(req, res);
});

module.exports = router;
