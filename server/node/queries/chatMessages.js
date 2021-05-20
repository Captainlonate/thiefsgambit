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

// Get a single chat message by it's ID
// $1 = chat message id
exports.getChatMessageByIdQuery = `
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
    cm.id = $1
  LIMIT 1
`

// Insert a new chat message
//
exports.insertNewChatMessageQuery = `
  INSERT INTO ${DB_TABLE_CHAT_MESSAGES}(created_at, updated_at, author_id, chat_room_id, message)
  VALUES($1, $2, $3, $4, $5)
  RETURNING id
`
