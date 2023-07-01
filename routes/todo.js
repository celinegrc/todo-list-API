const express = require('express')
const router = express.Router()
const todoCtrl = require('../controllers/todo')
const auth = require('../middleware/auth')

router.post('/add',auth, todoCtrl.addTodo)
router.get('/', todoCtrl.getTodos)
router.delete('/:id', auth, todoCtrl.deleteTodo)
router.put('/:id', auth, todoCtrl.updateTodo)

module.exports = router