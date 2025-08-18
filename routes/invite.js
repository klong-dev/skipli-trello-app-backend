const express = require('express');
const router = express.Router();

const cardController = require("../src/controllers/card.controller");

router.post('/accept/:inviteId', (req, res) => {
    return cardController.accept(req, res);
})

router.post('/decline/:inviteId', (req, res) => {
    return cardController.decline(req, res);
})

module.exports = router;