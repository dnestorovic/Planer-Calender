const express = require('express');
const router = express.Router();
const controller = require('../../models/controller')


router.get('/allTasks/:monthNumber', controller.getAllTasks);
router.get('/dailyTasks/:orderNumber', controller.getByOrderNumber);
router.post('/', controller.addTask);


module.exports = router;
