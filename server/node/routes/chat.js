var express = require('express');
var router = express.Router();

// Require controller modules
const chatController = require('../controllers/chatController')

// Custom Middleware
const JWTMiddleware = require('../middleware/jwt')

// Get recent chats for a specific Chat Room (:roomId)
router.get('/room/:roomId', JWTMiddleware, chatController.getChatsForRoom)