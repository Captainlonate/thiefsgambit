const { parseJWTSocketIO } = require('./handlerUtils')

const socketIOJWTMiddleware = (socket, next) => {
  const { success } = parseJWTSocketIO(socket)
  const status = success ? undefined : new Error('SocketIO:io.use():Missing/Invalid JWT')
  next(status)
}

module.exports = {
  socketIOJWTMiddleware
}
