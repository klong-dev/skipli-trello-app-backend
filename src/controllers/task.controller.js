// filepath: c:\Users\user\Desktop\WebStorm\SkipliBoardManagement\src\controllers\task.controller.js
const taskService = require('../services/task.service');

const taskController = {
    findAll: async (req, res) => {
        const {id} = req.params;
        const tasks = await taskService.findAll(id);
        return res.status(200).json(tasks);
    },

    findOne: async (req, res) => {
        const {taskId} = req.params;
        const task = await taskService.findOne(taskId);

        if (!task) {
            return res.status(404).json('Task not found');
        }

        return res.status(200).json(task);
    },

    create: async (req, res) => {
        const {id} = req.params;
        const {title, description, status} = req.body;
        const ownerId = req.user.id; // Assuming you have user info from JWT token

        const task = await taskService.create(id, ownerId, title, description, status);

        if (!task) {
            return res.status(400).json('Error creating task');
        }

        return res.status(201).json(task);
    },

    update: async (req, res) => {
        const {taskId} = req.params;
        const {title, description, status} = req.body;

        const updatedTask = await taskService.update(taskId, title, description, status);

        if (!updatedTask) {
            return res.status(400).json('Error updating task');
        }

        return res.status(200).json(updatedTask);
    },

    delete: async (req, res) => {
        const {taskId} = req.params;

        const result = await taskService.delete(taskId);

        if (!result) {
            return res.status(400).json('Error deleting task');
        }

        return res.status(204).send();
    },

    assignMember: async (req, res) => {
        const {taskId} = req.params;
        const {memberId} = req.body;

        const assignment = await taskService.assignMember(taskId, memberId);

        if (!assignment) {
            return res.status(400).json('Error assigning member to task');
        }

        return res.status(201).json(assignment);
    },

    getAssignedMembers: async (req, res) => {
        const {taskId} = req.params;

        const assignments = await taskService.getAssignedMembers(taskId);

        return res.status(200).json(assignments);
    },

    removeAssignment: async (req, res) => {
        const {taskId, memberId} = req.params;

        const result = await taskService.removeAssignment(taskId, memberId);

        if (!result) {
            return res.status(400).json('Error removing assignment');
        }

        return res.status(204).send();
    }
};

module.exports = taskController;
