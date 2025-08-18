const express = require('express');
const router = express.Router();
const boardController = require('../src/controllers/board.controller');

router.use('/:boardId/cards', require('./card'))

router.get('/', (req, res) => {
    return boardController.findAll(req, res);
});

router.get('/:id', (req, res) => {
    return boardController.findById(req, res);
})

router.post('/', (req, res) => {
    return boardController.create(req, res);
});

router.put('/:id', (req, res) => {
    return boardController.update(req, res);
})

router.delete('/:id', (req, res) => {
    return boardController.delete(req, res);
})

module.exports = router;

