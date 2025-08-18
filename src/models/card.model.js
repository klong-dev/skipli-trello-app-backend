const {DataTypes, Model} = require('sequelize');
const {sequelize} = require("../utils/db");
const Board = require("./board.model");

const Card = sequelize.define("card",
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
        }
    },
    {
        timestamps: true,
    }
)


Card.belongsTo(Board)

module.exports = Card;