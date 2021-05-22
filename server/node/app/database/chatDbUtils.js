const db = require('../database')
const {
  insertNewChatMessageQuery,
  getChatMessageByIdQuery
} = require('../queries/chatMessages')

/*
  Given a list of ChatMessage records from the database and
  the active user's ID (the person making the request),
  translate each database record into an object which
  will be returned to the API's requestor as-is.
*/
const prepareOneChatForResponse = (currentUserId) => (chat) => ({
  messageId: chat.messageId,
  authorId: chat.authorId,
  chatRoomId: chat.chatRoomId,
  message: (typeof chat.message === 'string') ? chat.message.trim() : '[Message Not Found]',
  timestamp: chat.timestamp,
  authorUserName: chat.authorUserName,
  writtenByMe: chat.authorId.toString() === currentUserId.toString()
})

// Translates ChatMessage database records into api response objects
const prepareChatsForResponse = (chats, currentUserId) => (
  chats.map(prepareOneChatForResponse(currentUserId))
)

// Insert a new chat message into the database
// Returns the id of the newly inserted record, or null if there was an error
const insertNewChatMessage = ({ authorId, chatRoomId, message }) => (
  new Promise((resolve) => {
    const values = [
      new Date(), // created_at
      new Date(), // updated_at
      authorId, // author_id
      chatRoomId, // chat_room_id
      message // message
    ]
    db.query(insertNewChatMessageQuery, values, (error, results) => {
      if (error) {
        console.error('insertNewChatMessage:Error inserting new chat message with values:', values, error)
        resolve(null)
      } else {
        if (Array.isArray(results.rows) && results.rows.length === 1) {
          resolve(results.rows[0].id)
        } else {
          console.log('insertNewChatMessage:results.rows was not an array of size 1', results.rows)
          resolve(null)
        }
      }
    })
  })
)

// Fetch a single chat message from the database by it's id
// Returns the raw database record, or null
const getChatMessageById = (chatMessageId) => (
  new Promise((resolve) => {
    db.query(getChatMessageByIdQuery, [chatMessageId], (error, results) => {
      if (error) {
        console.error('getChatMessageById:Error fetching chat message by ID:', chatMessageId, error)
        resolve(null)
      } else {
        if (Array.isArray(results.rows) && results.rows.length === 1) {
          resolve(results.rows[0])
        } else {
          console.log('getChatMessageById:results.rows was not an array of size 1', results.rows)
          resolve(null)
        }
      }
    })
  })
)

module.exports = {
  prepareOneChatForResponse,
  prepareChatsForResponse,
  insertNewChatMessage,
  getChatMessageById
}
