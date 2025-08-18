const service = require('../services/card.service');
const inviteService = require('../services/invite.service');
const Service = require("../services/invite.service");

const cardController = {
    findAll: async (req, res) => {
        const {boardId} = req.params;
        const cards = await service.findAll(boardId);
        return res.status(200).json(cards);
    },
    findOne: async (req, res) => {
        const {boardId, id} = req.params;
        const card = await service.findOne(boardId, id);
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
    invite: async (req, res) => {
        const {id} = req.params;
        const {authorId, memberId} = req.body;
        const invite = inviteService.sendInvite(authorId, memberId, id);
        if (!invite) {
            return res.status(400).json('Error creating invite');
        }
        res.status(200).json('Invite sent');
    },
    accept: async (req, res) => {
        const {inviteId} = req.params;
        const accept = await Service.acceptInvite(inviteId);
        if (!accept) {
            return res.status(400).json('Error accepting invite');
        }
        res.status(200).json('Accepted invite');
    },
    decline: async (req, res) => {
        const {inviteId} = req.params;
        const decline = await Service.declineInvite(inviteId);
        if (!decline) {
            return res.status(400).json('Error decline invite');
        }
        res.status(200).json('Declined invite');
    }
}

module.exports = cardController;