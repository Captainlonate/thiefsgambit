// This is the initial state of the Chat reducer, provided
// by the ChatProvider
export const initialChatContextState = {
  chatRooms: [], // [{ chatRoomId: '1', chatRoomName: 'Name' }, ...]
  activeChatRoomId: null, // '1'
  loadingChatRooms: true, // true | false
  groupedChatMessages: {} // { roomId1: [], roomId2: [], ... }
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
    default:
      return state
  }
}

export default chatReducer
