const cookie = require('cookie')
const jwt = require('jsonwebtoken')

const validChatRoom = (data) => (data && data.chatRoomId)

const validChatMessage = (data) => (
  data &&
  data.message &&
  typeof data.message === 'string'
)

const getChatRoomName = (chatRoomId) => `chat-room-${chatRoomId}`

const parseJWTSocketIO = (socket) => {
  const headers = socket.handshake.headers
  if (headers && headers.cookie) {
    const jwtCookie = cookie.parse(headers.cookie)
    if (jwtCookie && jwtCookie.jwt) {
      try {
        const payload = jwt.verify(
          jwtCookie.jwt,
          process.env.JWT_SIGN_KEY,
          { algorithms: ['HS256'] }
        )
        return { success: true, userData: payload }
      } catch (ex) {}
    }
  }

  return { success: false, userData: null }
}

module.exports = {
  validChatRoom,
  validChatMessage,
  getChatRoomName,
  parseJWTSocketIO
}
