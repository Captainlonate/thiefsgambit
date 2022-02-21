// For loading the .env file
require('dotenv').config()
// For creating the API
const express = require('express')
// Middleware for express
const cors = require('cors')
const cookieParser = require('cookie-parser')
// Routes for express
const chatRoutes = require('./routes/chat')
// SocketIO Dependencies - middleware, utils and handlers
const http = require('http')
const https = require('https')
const fs = require('fs')
const { Server } = require('socket.io')
const { socketIOJWTMiddleware } = require('./socketIOHandlers/jwtMiddleware')
const { parseJWTSocketIO } = require('./socketIOHandlers/handlerUtils')
const socketHandleJoinChatRoom = require('./socketIOHandlers/joinChatRoom')
const socketHandleNewChatMessage = require('./socketIOHandlers/newChatMessage')

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

// Set up SocketIO
const server = (process.env.NODE_ENV === 'production')
  ? https.createServer({
      key: fs.readFileSync('app/certs/ssl.key'),
      cert: fs.readFileSync('app/certs/ssl.cert')
    }, app)
  : http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://slots.pirated.technology'],
    credentials: true
  }
})
io.use(socketIOJWTMiddleware)

// io.of('/').adapter.rooms - A Map of chatRoomName -> { sockets in the room }
io.on('connection', (socket) => {
  const { userData } = parseJWTSocketIO(socket)
  socketHandleJoinChatRoom(io, socket, userData)
  socketHandleNewChatMessage(io, socket, userData)
})

// Start express
const EXPRESS_PORT = 3002
server.listen(EXPRESS_PORT, () => {
  console.log(`Gambit Chat App listening at http://localhost:${EXPRESS_PORT} running in ${process.env.NODE_ENV} environment.`)
})
