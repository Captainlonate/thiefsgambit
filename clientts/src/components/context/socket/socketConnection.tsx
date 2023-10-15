import { io, Socket } from 'socket.io-client'
import { IChatMessage, IChatRoom } from '@api/ApiReturnDataTypes'

interface ServerToClientEvents {
  chat_room_message: (newChatMessage: IChatMessage) => void
}

interface ClientToServerEvents {
  /**
   * Submit this when the user wants to join a specific chat room.
   */
  join_chat_room: (chatRoomId: IChatRoom['chatRoomId']) => void
  /**
   * Submit this when the user wants to submit a new chat message
   * to a specific chat room.
   */
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
