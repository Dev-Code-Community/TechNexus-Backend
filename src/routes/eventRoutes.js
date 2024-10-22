const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/', eventController.getAllEvents);
router.get('/online', eventController.getOnlineEvents);
router.get('/offline', eventController.getOfflineEvents);
router.post('/createevent', eventController.createEvent);

module.exports = router;