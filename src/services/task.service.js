const Task = require('../models/task.model');
const TaskAssignment = require('../models/taskAssignment.model');
const Card = require('../models/card.model');

const taskService = {
    findAll: async (cardId) => {
        return Task.findAll({
            where: {
                cardId: cardId
            }
        });
    },

    findOne: async (taskId) => {
        return Task.findOne({
            where: {
                id: taskId
            }
        });
    },

    create: async (cardId, ownerId, title, description, status) => {
        try {
            const card = await Card.findByPk(cardId);
            if (!card) {
                return null;
            }

            return Task.create({
                cardId,
                ownerId,
                title,
                description,
                status
            });
        } catch (error) {
            console.error('Error creating task:', error);
            return null;
        }
    },

    update: async (taskId, title, description, status) => {
        try {
            const task = await Task.findByPk(taskId);
            if (!task) {
                return null;
            }

            return task.update({
                title: title || task.title,
                description: description || task.description,
                status: status || task.status
            });
        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
    },

    delete: async (taskId) => {
        try {
            const task = await Task.findByPk(taskId);
            if (!task) {
                return false;
            }

            await task.destroy();
            return true;
        } catch (error) {
            console.error('Error deleting task:', error);
            return false;
        }
    },

    assignMember: async (taskId, memberId) => {
        try {
            const task = await Task.findByPk(taskId);
            if (!task) {
                return null;
            }

            return TaskAssignment.create({
                taskId,
                memberId
            });
        } catch (error) {
            console.error('Error assigning member to task:', error);
            return null;
        }
    },

    getAssignedMembers: async (taskId) => {
        try {
            return TaskAssignment.findAll({
                where: {
                    taskId
                }
            });
        } catch (error) {
            console.error('Error getting assigned members:', error);
            return [];
        }
    },

    removeAssignment: async (taskId, memberId) => {
        try {
            const assignment = await TaskAssignment.findOne({
                where: {
                    taskId,
                    memberId
                }
            });

            if (!assignment) {
                return false;
            }

            await assignment.destroy();
            return true;
        } catch (error) {
            console.error('Error removing assignment:', error);
            return false;
        }
    }
};

module.exports = taskService;
