const express = require('express');
const router = express.Router();
const controller = require('../../models/controller')

router.get('/:id', controller.getById);
router.get('/allTasks/:monthNumber', controller.getAllTasks);
router.get('/dailyTasks/:orderNumber/:monthNumber/:yearNumber', controller.getByOrderNumber);
router.put('/:id', controller.updateTask)
router.post('/', controller.addTask);
router.delete('/:id', controller.deleteByDate);


module.exports = router;
