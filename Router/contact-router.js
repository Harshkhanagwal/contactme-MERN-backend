const express = require('express');
const contactController = require('../controller/contact-controller')
const router = express.Router();

router.post('/contactmsg', contactController);

module.exports = router;
