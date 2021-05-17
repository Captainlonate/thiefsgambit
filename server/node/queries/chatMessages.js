const {
  DB_TABLE_CHAT_MESSAGES,
  DB_TABLE_USERS
} = require('./tableNames')

// Get recent chat messages for a particular chat room
// $1 = chat room id
exports.getMessagesForRoomQuery = `
  SELECT
    cm.id as "messageId",
    cm.author_id as "authorId",
    cm.chat_room_id as "chatRoomId",
    cm.message as "message",
    cm.created_at as "timestamp",
    u.username as "authorUserName"
  FROM ${DB_TABLE_CHAT_MESSAGES} cm
  JOIN ${DB_TABLE_USERS} u
    on u.id = cm.author_id
  WHERE
    chat_room_id = $1
  ORDER BY "timestamp" DESC
  LIMIT 20
`
