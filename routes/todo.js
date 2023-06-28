const express = require('express')
const router = express.Router()
const todoCtrl = require('../controllers/todo')

router.post('/add', todoCtrl.addTodo)
router.get('/', todoCtrl.getTodos)
router.delete('/:id', todoCtrl.deleteTodo)

module.exports = router