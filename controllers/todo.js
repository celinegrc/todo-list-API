const Todo = require('../models/todo')


exports.addTodo = async (req, res) => {
    try {
    console.log(req.body)
    delete req.body._id
      
    // Crée une nouvelle instance 
        const todo = new Todo({
        ...req.body,     
        })
      
    // Enregistre le todo dans la base de données
    await todo.save()
        res.status(201).json( todo)

    } catch (error) {
      res.status(400).json({ error })
      }
}

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
  
     /* if (todo.userId != req.auth.userId) {
         Vérifie si l'ID de l'utilisateur du livre correspond à l'ID de l'utilisateur authentifié
        res.status(403).json({ message: 'Not authorized' })
      } else {*/
  

        await todo.deleteOne()
  
        res.status(200).json({ message: 'Objet supprimé !' })

      //}
    } catch (error) {
      res.status(500).json({ error })
    }
  }