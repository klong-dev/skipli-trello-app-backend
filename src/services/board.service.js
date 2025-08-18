const Board = require('../models/board.model')

module.exports.findAll = async () => {
    return await Board.findAll();
}

module.exports.findById = async (id) => {
    return await Board.findByPk(id);
}

module.exports.create = async (name, description) => {
    return await Board.create({name, description});
}

module.exports.update = async (id, name, description) => {
    return await Board.update(
        {name, description},
        {where: {id}}
    );
}

module.exports.delete = async (id) => {
    return await Board.destroy({
        where: {id}
    })
}