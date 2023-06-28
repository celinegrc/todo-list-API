const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    userId : { type: String, required: true },
    todo: { type: String, required: true },
    
})

module.exports = mongoose.model('Todo', todoSchema)