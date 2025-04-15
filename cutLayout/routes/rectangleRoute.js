const express = require('express');
const router = express.Router();
const rectangleController = require('../controllers/rectangleController');

router.get('/', rectangleController.getRectangle);
router.post('/calculate', rectangleController.postRectangle);

module.exports = router;