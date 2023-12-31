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
const corsOptions = {
  origin: 'https://todo-app-react-by-celine.netlify.app', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));




/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})*/

app.use(express.json())


app.get("/", (req, res) => {
  res.send("Hello server")
})


app.use('/api/auth', userRoutes)
app.use('/api/todo', todoRoutes)

module.exports = app