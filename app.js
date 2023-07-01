const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const todoRoutes = require('./routes/todo')
const helmet = require ('helmet')
const cors = require('cors')
const dotenv = require('dotenv').config()


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wx9munr.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use(helmet())
app.use(cors())


app.use(express.json())
     
app.use('/api/auth', userRoutes)
app.use('/api/todo', todoRoutes)


module.exports = app