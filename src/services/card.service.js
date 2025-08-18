const Card = require("../models/card.model");
const {Op} = require("sequelize");

module.exports.findAll = async (boardId) => {
    return await Card.findAll({where: {boardId}});
}
module.exports.findOne = async (boardId, id) => {
    return await Card.findOne({where: {id}});
}
module.exports.findByUserId = async (boardId, userId) => {
    return await Card.findAll({
        where: {
            boardId,
            members: {
                [Op.contains]: [userId]
            },
        }
    });
}
module.exports.create = async (boardId, name, description) => {
    return await Card.create({
        name,
        description,
        boardId,
    });
}
module.exports.update = async (boardId, id, name, description, member) => {
    if (!name) name = undefined;
    if (!description) description = undefined;
    if (!member) member = undefined;
    return await Card.create(
        {
            name,
            description,
            member,
        },
        {where: {id, boardId}}
    );
}
module.exports.delete = async (boardId, id) => {
    return await Card.destroy({where: {id, boardId}});
}