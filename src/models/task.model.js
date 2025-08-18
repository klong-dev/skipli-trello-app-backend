// filepath: c:\Users\user\Desktop\WebStorm\SkipliBoardManagement\src\models\task.model.js
const {DataTypes} = require('sequelize');
const {sequelize} = require("../utils/db");
const Card = require("./card.model");

const Task = sequelize.define("task",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        cardId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Card,
                key: 'id'
            }
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'TODO'
        }
    },
    {
        timestamps: true,
    }
);

module.exports = Task;
