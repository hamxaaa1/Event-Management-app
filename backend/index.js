const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
require('./Models/db')
const AuthRouter = require('./Routes/AuthRouter')
const ProductsRouter = require('./Routes/ProductsRouter')
const TodoRouter = require('./Routes/TodoRouter')

const PORT = process.env.PORT || 8080
app.use(bodyParser.json())
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/products', ProductsRouter)
app.use('/todos', TodoRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});
app.get('/', (req, res) => {
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`)
})