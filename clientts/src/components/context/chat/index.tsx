import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from 'react'
import chatReducer, {
  getInitialChatContextState,
  IChatContextState,
  ChatContextActions,
} from './reducer'
import { socketConnection } from '../socket/socketConnection'
import { IChatMessage } from '@api/ApiReturnDataTypes'
import Logger from '@logger'

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
  const [chatState, chatDispatch] = useReducer(
    chatReducer,
    getInitialChatContextState()
  )

  const onChatRoomMessage = useCallback(function (
    newChatMessage: IChatMessage
  ) {
    chatDispatch({ type: 'ADD_CHAT_MESSAGE', payload: newChatMessage })
  },
  [])

  useEffect(() => {
    Logger.debug('Attaching chat room listener.')
    // Listen for new chat messages and add them to the room
    socketConnection.on('chat_room_message', onChatRoomMessage)

    return () => {
      socketConnection.off('chat_room_message', onChatRoomMessage)
    }
  }, [onChatRoomMessage])

  return (
    <ChatContext.Provider value={[chatState, chatDispatch]}>
      {children}
    </ChatContext.Provider>
  )
}
