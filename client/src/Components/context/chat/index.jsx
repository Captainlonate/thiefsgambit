import React, { createContext, useReducer, useContext } from 'react'
import chatReducer, { initialChatContextState } from './reducer'

export const ChatContext = createContext({})

// Example: const [chatState, setChatState] = useChatContext()
export const useChatContext = () => useContext(ChatContext)

/*
  The ChatProvider makes use of a reducer to manage it's state.
  The ChatProvider stores ChatRooms, Chat messages, active chat room, etc.
*/
export const ChatProvider = ({ children }) => {
  return (
    <ChatContext.Provider value={useReducer(chatReducer, initialChatContextState)}>
      {children}
    </ChatContext.Provider>
  )
}
