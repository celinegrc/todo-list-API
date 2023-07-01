const Todo = require('../models/todo')
const sanitize = require ('mongo-sanitize')

exports.addTodo = async (req, res) => {
  try {
    if (req.body.userId != req.auth.userId) {
      res.status(403).json({ message: 'Not authorized' })
    } else {
      const cleanedBody = sanitize(req.body);
      console.log(cleanedBody);
      delete cleanedBody._id;

      const todo = new Todo({
        ...cleanedBody,
      });

      await todo.save();
      res.status(201).json(todo);
    }
    } catch (error) {
      res.status(400).json({ error });
    }
  };

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
 
    if (todo.userId != req.auth.userId) {
      res.status(403).json({ message: 'Not authorized' })
    } else {
    todo.isCompleted = req.body.isCompleted;

    await todo.save();

    res.status(200).json(todo);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};


exports.getTodos = async (req, res) => {
  try {
    const userId = req.query.userId; 
    const todos = await Todo.find({ userId: userId }); 
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ error })
  }
}


exports.deleteTodo= async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id })
    console.log(`le ${todo} à supprimer`)
    
      if (todo.userId != req.auth.userId) {

        res.status(403).json({ message: 'Not authorized' })
      } else {
  
        await todo.deleteOne()
  
        res.status(200).json({ message: 'Objet supprimé !' })

      }
    } catch (error) {
      res.status(500).json({ error })
    }
  }