const express = require('express');
const router = express.Router();

router.use('/boards', require('./board'));
router.use(require('./auth'))
// router.use('/cards', require('./card'));

module.exports = router;
