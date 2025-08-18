const service = require('../services/card.service');

const cardController = {
    findAll: async (req, res) => {
        const {boardId} = req.params;
        const cards = await service.findAll(boardId);
        return res.status(200).json(cards);
    },
    findOne: async (req, res) => {
        const {boardId, id} = req.params;
        const card = await service.findOne({boardId, id});
        return res.status(200).json(card);
    },
    findByUserId: async (req, res) => {
        const {boardId, userId} = req.params;
        const cards = await service.findByUserId(boardId, userId);
        return res.status(200).json(cards);
    },
    create: async (req, res) => {
        const {boardId} = req.params;
        const {name, description} = req.body;
        const card = await service.create(boardId, name, description);
        if (card) return res.status(200).json('Card create successfully');
        return res.status(400).json('Error creating card');
    },
    update: async (req, res) => {
        const {boardId, id, name, description, member} = req.body;
        const card = await service.update(boardId, id, name, description);
        if (card) return res.status(200).json('Card update successfully');
        return res.status(400).json('Error updating card');
    },
    delete: async (req, res) => {
        const {boardId, id} = req.params;
        const card = await service.delete(boardId, id);
        if (card) return res.status(200).json('Card delete successfully');
        return res.status(400).json('Error deleting card');
    },
}

module.exports = cardController;