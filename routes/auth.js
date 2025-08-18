const express = require('express');
const router = express.Router();
const authController = require('../src/controllers/auth.controller');

router.get('/github/oauth', (req, res) => {
    return authController.github(req, res);
})

module.exports = router;