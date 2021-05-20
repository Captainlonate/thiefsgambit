export const NULL_CHATROOM = { chatRoomId: null, chatRoomName: '' }

// This is the initial state of the Chat reducer, provided
// by the ChatProvider
export const initialChatContextState = {
  chatRooms: [], // [{ chatRoomId: '1', chatRoomName: 'Name' }, ...]
  activeChatRoom: { ...NULL_CHATROOM }, // { chatRoomId: '1', chatRoomName: 'Name' 
  loadingChatRooms: true, // true | false
  chatMessagesForRoom: [],
  viewingChats: false // true | false
}

// This reducer is used in conjuction with a context.
// The reducer manages "Chat" state, such as storing
// chat messages, and lists of chat rooms.
const chatReducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_CHATROOMS_LIST':
      return {
        ...state,
        chatRooms: Array.isArray(payload) ? payload : [],
        loadingChatRooms: false
      }
    case 'SET_ACTIVE_CHATROOM':
      return {
        ...state,
        activeChatRoom: { ...payload },
      }
    case 'SET_CHAT_ROOM_MESSAGES':
      return {
        ...state,
        chatMessagesForRoom: Array.isArray(payload) ? [...payload] : state.chatMessagesForRoom
      }
    case 'SET_VIEWING_CHATS':
      return {
        ...state,
        viewingChats: payload
      }
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatMessagesForRoom: [
          ...state.chatMessagesForRoom,
          payload
        ]
      }
    default:
      return state
  }
}

export default chatReducer
