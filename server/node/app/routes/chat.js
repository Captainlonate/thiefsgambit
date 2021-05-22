const express = require('express')
const router = express.Router()

// Require controller modules
const chatController = require('../controllers/chatController')

// Custom Middleware
const JWTMiddleware = require('../middleware/jwt')

// Get recent chats for a specific Chat Room (:roomId)
router.get('/room/:roomId', JWTMiddleware, chatController.getChatsForRoom)
router.get('/room', JWTMiddleware, chatController.getChatRooms)

module.exports = router
