const express = require('express');
const router = express.Router();
const circleKController = require('../controllers/circleKController');

router.get('/', circleKController.getCircleK);
router.post('/circlecalculate', circleKController.postCircleK);

module.exports = router;