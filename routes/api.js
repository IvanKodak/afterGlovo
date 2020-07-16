var express = require('express');
var router = express.Router();

const afterGlovoController = require('../controller/afterGlovo.controller');

// *** Order Routes *** /

router.post('/order', (req, res, next) => afterGlovoController.getOrder(req, res, next));

module.exports = router;