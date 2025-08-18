const express = require('express');
const router = express.Router({mergeParams: true});
const cardController = require('../src/controllers/card.controller');

router.get('/', (req, res) => {
    return cardController.findAll(req, res);
});

router.get('/:id', (req, res) => {
    return cardController.findOne(req, res);
})

router.get('/user/:userId', (req, res) => {
    return cardController.findByUserId(req, res);
})

router.post('/', (req, res) => {
    return cardController.create(req, res);
});

router.put('/:id', (req, res) => {
    return cardController.update(req, res);
})

router.delete('/:id', (req, res) => {
    return cardController.delete(req, res);
})

module.exports = router;

