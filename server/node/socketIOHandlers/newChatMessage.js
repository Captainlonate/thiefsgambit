const { validChatRoom, getChatRoomName, validChatMessage } = require('./handlerUtils')
const {
  insertNewChatMessage,
  getChatMessageById,
  prepareOneChatForResponse
} = require('../database/chatDbUtils')

const handleSocketNewChatMessage = (io, socket, userData) => {
  socket.on('new_chat_message', async (data) => {
    if (validChatRoom(data) && validChatMessage(data)) {
      console.log('This user submitted a message', userData)
      console.log(`${socket.id} sent a new message to chat room ${data.chatRoomId}: "${data.message}"`)

      const newChatMessageId = await insertNewChatMessage({
        authorId: userData.uuid,
        chatRoomId: data.chatRoomId,
        message: data.message
      })

      if (newChatMessageId) {
        const newChatMessage = await getChatMessageById(newChatMessageId)
        if (newChatMessage) {
          const preparedMessageForAuthor = {
            ...prepareOneChatForResponse(userData.uuid)(newChatMessage),
            writtenByMe: true
          }
          const preparedMessageForEveryoneElse = {
            ...preparedMessageForAuthor,
            writtenByMe: false
          }
          // Send to the person who wrote it...
          io.to(socket.id)
            .emit('chat_room_message', preparedMessageForAuthor)

          // Send to everyone else in the room, except who wrote it...
          io.to(getChatRoomName(data.chatRoomId))
            .except(socket.id)
            .emit('chat_room_message', preparedMessageForEveryoneElse)
        }
      }
    }
  })
}

module.exports = handleSocketNewChatMessage
