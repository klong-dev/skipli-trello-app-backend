const express = require('express');
const service = require('../services/board.service')

const boardController = {
    findAll: async (req, res) => {
        const boards = await service.findAll();
        res.status(200).json(boards);
    },
    findById: async (req, res) => {
        const id = req.params.id;
        const board = await service.findById(id)
        if (!board) {
            res.status(404).json('Not Found');
        }
        res.status(200).json(board);
    },
    create: async (req, res) => {
        const {name, description} = req.body;
        const board = await service.create(name, description);
        if (!board) {
            return res.status(400).json('Error creating board');
        }
        res.status(201).json('Create new board successfully');
    },
    update: async (req, res) => {
        const id = req.params.id;
        const {name, description} = req.body;
        const board = await service.update(id, name, description);
        if (!board) {
            return res.status(400).json('Error updating board');
        }
        res.status(200).json('Update board successfully');
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const board = await service.delete(id);
        if (!board) {
            return res.status(404).json('Not Found');
        }
        res.status(200).json('Delete board successfully');
    }
}

module.exports = boardController;