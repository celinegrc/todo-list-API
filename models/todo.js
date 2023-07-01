const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    userId : { type: String, required: true },
    todo: { type: String, required: true },
    isCompleted : {type : Boolean, required : true, default: false}
    
})

module.exports = mongoose.model('Todo', todoSchema)