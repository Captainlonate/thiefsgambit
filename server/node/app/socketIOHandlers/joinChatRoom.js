const { validChatRoom, getChatRoomName } = require('./handlerUtils')

const handleSocketJoinChatRoom = (io, socket, userData) => {
  socket.on('join_chat_room', async (data) => {
    if (validChatRoom(data)) {
      // Create the chat room name
      const chatRoomName = getChatRoomName(data.chatRoomId)
      // Remove the socket from all rooms
      for (const roomName of socket.rooms) {
        // Don't remove the socket from it's own private room
        if (roomName !== socket.id) {
          socket.leave(roomName)
        }
      }
      // Join the socket to their new room
      socket.join(chatRoomName)
    }
  })
}

module.exports = handleSocketJoinChatRoom
