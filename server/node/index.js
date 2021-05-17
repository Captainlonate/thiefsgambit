// For loading the .env file
require('dotenv').config()
// For creating the API
const express = require('express')
// Middleware for express
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const jwt = require('jsonwebtoken')
// For connecting to Postgres
// const Pool = require('pg').Pool
// Routes for express
const chatRoutes = require('./routes/chat')

process.title = `Thief's Gambit Chat`

// Make sure all the necessary environment vars are present
// const necessaryEnvVars = [
//   process.env.DB_USER,
//   process.env.DB_URL,
//   process.env.DB_NAME,
//   process.env.DB_PASS,
//   process.env.DB_PORT,
// ]
// if (!necessaryEnvVars.every((envVar) => envVar)) {
//   throw new Error('Missing environment variables!')
// }

// Connect to the PostGres database
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_URL,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// })

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
