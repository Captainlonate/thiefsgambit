const { DB_TABLE_CHAT_ROOMS } = require('./tableNames')

// Get all ChatRooms (including elite only rooms)
exports.getAllChatRooms = `
  SELECT
    id as "chatRoomId",
    room_name as "chatRoomName"
  FROM ${DB_TABLE_CHAT_ROOMS}
`

// Get only non-elite chat rooms
exports.getAllCommonChatRooms = `
  SELECT
    id as "chatRoomId",
    room_name as "chatRoomName"
  FROM ${DB_TABLE_CHAT_ROOMS}
  WHERE
    elite_only = false
`
