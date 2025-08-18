const {DataTypes, Model} = require('sequelize');
const {sequelize} = require("../utils/db");

const Invite = sequelize.define("invite",
    {
        invite_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        card_id: {
            type: DataTypes.UUID,
            nullable: false,
        },
        board_owner_id: {
            type: DataTypes.UUID,
            nullable: false,
        },
        member_id: {
            type: DataTypes.UUID,
            nullable: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'declined'),
            defaultValue: 'pending',
        }
    },
    {
        timestamps: true,
    }
)

module.exports = Invite;