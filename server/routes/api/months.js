const express = require('express');
const router = express.Router();
const controller = require('../../models/controller')


router.get('/', controller.getAllTasks);
router.get('/:orderNumber', controller.getByOrderNumber);
router.post('/', controller.addTask);


module.exports = router;
