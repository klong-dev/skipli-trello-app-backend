const {sequelize} = require("../utils/db");
const Card = require("../models/card.model");
const {DataTypes, Model} = require('sequelize');

const Board = sequelize.define("board",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    })

Board.hasMany(Card);

module.exports = Board;