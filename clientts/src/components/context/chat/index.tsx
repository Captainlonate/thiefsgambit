import React, { createContext, useReducer, useContext } from 'react'
import chatReducer, {
  getInitialChatContextState,
  IChatContextState,
  ChatContextActions,
} from './reducer'

type IChatContextValue = [IChatContextState, React.Dispatch<ChatContextActions>]

export const ChatContext = createContext<IChatContextValue>([
  getInitialChatContextState(),
  () => {},
])

/**
 * Example: const [chatState, setChatState] = useChatContext()
 */
export const useChatContext = () => useContext(ChatContext)

interface IChatProviderProps {
  children: React.ReactNode
}

/**
 * The ChatProvider makes use of a reducer to manage it's state.
 * The ChatProvider stores ChatRooms, Chat messages, active chat room, etc.
 */
export const ChatProvider = ({ children }: IChatProviderProps) => {
  return (
    <ChatContext.Provider
      value={useReducer(chatReducer, getInitialChatContextState())}
    >
      {children}
    </ChatContext.Provider>
  )
}
