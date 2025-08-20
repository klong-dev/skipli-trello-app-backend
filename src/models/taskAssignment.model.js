const {DataTypes} = require('sequelize');
const {sequelize} = require("../utils/db");
const Task = require("./task.model");

const TaskAssignment = sequelize.define("taskAssignment",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        taskId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Task,
                key: 'id'
            }
        },
        memberId: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = TaskAssignment;
