const { getMessagesForRoomQuery } = require('../queries/chatMessages')

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

  console.log(`Get chats for room ${roomId}`, typeof roomId)
  console.log('res.locals', JSON.stringify(res.locals, null, 2))

  pool.query(getMessagesForRoomQuery, [roomId], (error, results) => {
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
    console.log('Success', results.rows, res.locals.userId, typeof res.locals.userId)
    return res.json({
      success: true,
      error: null,
      data: prepareChatsForResponse(results.rows, res.locals.userId)
    })
  })
}
