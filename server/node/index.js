// For loading the .env file
require('dotenv').config()
// For creating the API
const express = require('express')
// Middleware for express
const cors = require('cors')
const cookieParser = require('cookie-parser')
// Routes for express
const chatRoutes = require('./routes/chat')

// Task Manager, terminal tab title
process.title = "Thief's Gambit Chat"

// Express and express's middleware
const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/chats', chatRoutes)

// Start express
const EXPRESS_PORT = 3002
app.listen(EXPRESS_PORT, () => {
  console.log(`Example app listening at http://localhost:${EXPRESS_PORT}`)
})
