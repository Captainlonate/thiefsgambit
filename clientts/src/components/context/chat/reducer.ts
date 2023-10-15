import { IChatMessage, IChatRoom } from '@api/ApiReturnDataTypes'

export interface IChatContextState {
  chatRooms: IChatRoom[]
  activeChatRoom: IChatRoom
  loadingChatRooms: boolean
  chatMessagesForRoom: IChatMessage[]
  viewingChats: boolean
}

// This is the initial state of the Chat reducer, provided
// by the ChatProvider
export const getInitialChatContextState = (): IChatContextState => ({
  chatRooms: [],
  activeChatRoom: { chatRoomId: '', chatRoomName: '' },
  loadingChatRooms: true,
  chatMessagesForRoom: [],
  viewingChats: false,
})

export type ChatContextActions =
  | { type: 'UPDATE_CHATROOMS_LIST'; payload: IChatRoom[] }
  | { type: 'SET_ACTIVE_CHATROOM'; payload: IChatRoom }
  | { type: 'SET_CHAT_ROOM_MESSAGES'; payload: IChatMessage[] }
  | { type: 'SET_VIEWING_CHATS'; payload: boolean }
  | { type: 'ADD_CHAT_MESSAGE'; payload: IChatMessage }

// This reducer is used in conjuction with a context.
// The reducer manages "Chat" state, such as storing
// chat messages, and lists of chat rooms.
const chatReducer = (
  state: IChatContextState,
  { type, payload }: ChatContextActions
) => {
  switch (type) {
    case 'UPDATE_CHATROOMS_LIST':
      return {
        ...state,
        chatRooms: Array.isArray(payload) ? [...payload] : [],
        loadingChatRooms: false,
      }
    case 'SET_ACTIVE_CHATROOM':
      return {
        ...state,
        activeChatRoom: { ...payload },
      }
    case 'SET_CHAT_ROOM_MESSAGES':
      return {
        ...state,
        chatMessagesForRoom: Array.isArray(payload)
          ? [...payload]
          : state.chatMessagesForRoom,
      }
    case 'SET_VIEWING_CHATS':
      return {
        ...state,
        viewingChats: payload,
      }
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatMessagesForRoom: [...state.chatMessagesForRoom, payload],
      }
    default:
      return state
  }
}

export default chatReducer
