const db = require('../database')
const { getMessagesForRoomQuery } = require('../queries/chatMessages')
const {
  getAllChatRooms,
  getAllCommonChatRooms
} = require('../queries/chatRooms')

/*
  Given a list of ChatMessage records from the database and
  the active user's ID (the person making the request),
  translate each database record into an object which
  will be returned to the API's requestor as-is.
*/
const prepareChatsForResponse = (chats, currentUserId) => (
  chats.map((chat) => ({
    messageId: chat.messageId,
    authorId: chat.authorId,
    chatRoomId: chat.chatRoomId,
    message: (typeof chat.message === 'string') ? chat.message.trim() : '[Message Not Found]',
    timestamp: chat.timestamp,
    authorUserName: chat.authorUserName,
    writtenByMe: chat.authorId.toString() === currentUserId.toString()
  }))
)

/*
  Get recent chats for a specific chat room
*/
exports.getChatsForRoom = (req, res) => {
  const roomId = req.params.roomId

  db.query(getMessagesForRoomQuery, [roomId], (error, results) => {
    if (error) {
      console.error(`Error querying chats for room id: ${roomId}`, error.message)
      return res.json({
        success: false,
        error: {
          error_code: 'error_recent_room_chats',
          human_msg: `Failed to get messages for room id: ${roomId}`,
          err: null
        },
        data: []
      })
    }

    return res.json({
      success: true,
      error: null,
      data: prepareChatsForResponse(results.rows, res.locals.userId)
    })
  })
}

/*
  Fetches a list of all the ChatRooms that are visible
  to the user. Elite users can see all chat rooms, whilst
  others can only see ChatRooms marked as not elite.
  A user is Elite if their JWT's payload contained:
    iselite = true
  which will be stored in res.locals.isElite
*/
exports.getChatRooms = (req, res) => {
  // This will be a typeof boolean
  const userIsElite = res.locals.isElite

  const roomsQuery = userIsElite ? getAllChatRooms : getAllCommonChatRooms

  db.query(roomsQuery, (error, results) => {
    if (error) {
      console.error(`Error querying chat rooms for isElite: ${userIsElite}`, error.message)
      return res.json({
        success: false,
        error: {
          error_code: 'error_getting_chat_rooms',
          human_msg: 'Failed to get chat rooms for user.',
          err: null
        },
        data: []
      })
    }

    return res.json({
      success: true,
      error: null,
      data: results.rows
    })
  })
}
