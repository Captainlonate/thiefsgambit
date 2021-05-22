const db = require('../database')
const { getMessagesForRoomQuery } = require('../queries/chatMessages')
const { makeSuccessResponse } = require('./responseUtils')
const { prepareChatsForResponse } = require('../database/chatDbUtils')
const {
  getAllChatRooms,
  getAllCommonChatRooms
} = require('../queries/chatRooms')

/*
  Get recent chats for a specific chat room
*/
exports.getChatsForRoom = (req, res) => {
  const roomId = req.params.roomId
  const userId = res.locals.userId // typeof number

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

    const preparedChatMessages = prepareChatsForResponse(results.rows, userId)
    return res.json(makeSuccessResponse(preparedChatMessages))
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
  // res.locals.isElite will be a typeof boolean
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

    return res.json(makeSuccessResponse(results.rows))
  })
}
