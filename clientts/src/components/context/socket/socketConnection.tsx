import { io, Socket } from 'socket.io-client'
import { IChatMessage, IChatRoom } from '../../../api/ApiReturnDataTypes'

interface ServerToClientEvents {
  chat_room_message: (newChatMessage: IChatMessage) => void
}

interface ClientToServerEvents {
  join_chat_room: ({
    chatRoomId,
  }: {
    chatRoomId: IChatRoom['chatRoomId']
  }) => void
  new_chat_message: ({
    chatRoomId,
    message,
  }: {
    chatRoomId: IChatRoom['chatRoomId']
    message: string
  }) => void
}

export type IChatSocketConnection = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>

export const socketConnection: IChatSocketConnection = io(
  import.meta.env.VITE_URL_SOCKETIO,
  {
    withCredentials: true,
  }
)
