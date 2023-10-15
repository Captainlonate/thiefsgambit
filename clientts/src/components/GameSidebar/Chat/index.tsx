import ChatRoomChat from './ChatRoomChat'
import ChatRoomsList from './ChatRoomsList'
import { useChatContext } from '@context/chat/index'
import { socketConnection } from '@context/socket/socketConnection'
import { groupChats } from '@context/chat/helpers'
import Logger from '@logger'
import { API } from '@api/Api'
import { IChatRoom } from '@api/ApiReturnDataTypes'

interface IChatSidebarProps {
  onOpenToggle: () => void
}

/**
 * Place directly within a GameSidebar.
 * This component has two possible views:
 *   Viewing a list of chat rooms (ChatRoomsList)
 *   Viewing chat messages within a given room (ChatRoomChat)
 */
const ChatSidebar = ({ onOpenToggle }: IChatSidebarProps) => {
  const [chatContext, setChatContext] = useChatContext()
  const { activeChatRoom, chatMessagesForRoom, viewingChats } = chatContext
  const hasActiveChatRoom = activeChatRoom && activeChatRoom.chatRoomId

  /**
   * What to do when a user clicks on the Enter button next to a chat room.
   * At a minimum, change the view to show the chat messages.
   * But, it may be necessary to fetch recent chat messages too.
   * In addition, the server needs to know that a user is in this room, so the
   * websocket connection can start sending new, live messages.
   */
  async function joinChatRoom(newChatRoom: IChatRoom) {
    const isAValidChatRoomToJoin = newChatRoom && newChatRoom.chatRoomId
    const alreadyHasActiveChatRoom =
      chatContext.activeChatRoom && chatContext.activeChatRoom.chatRoomId

    if (isAValidChatRoomToJoin) {
      if (
        !alreadyHasActiveChatRoom ||
        newChatRoom.chatRoomId !== chatContext.activeChatRoom.chatRoomId
      ) {
        // Update the active chat room
        setChatContext({ type: 'SET_ACTIVE_CHATROOM', payload: newChatRoom })

        // Fetch the recent chat messages for this new room
        const apiResponse = await API.GetRecentChatsForOneRoom(
          newChatRoom.chatRoomId
        )

        if (apiResponse.isError) {
          Logger.error(
            'Could not retrieve chat messages for room',
            newChatRoom,
            apiResponse.errorMessage,
            apiResponse.errorCode
          )
          return
        }

        if (apiResponse.data && Array.isArray(apiResponse.data)) {
          // Most recent chats are first, so they must be reversed
          setChatContext({
            type: 'SET_CHAT_ROOM_MESSAGES',
            payload: apiResponse.data.reverse(),
          })
        }

        socketConnection.emit('join_chat_room', newChatRoom.chatRoomId)
      }

      // Change the UI from showing all chat rooms, to messages within this new room
      setChatContext({ type: 'SET_VIEWING_CHATS', payload: true })
    }
  }

  return viewingChats && hasActiveChatRoom ? (
    <ChatRoomChat
      onBack={() =>
        setChatContext({ type: 'SET_VIEWING_CHATS', payload: false })
      }
      chatRoom={activeChatRoom}
      groupedChats={groupChats(chatMessagesForRoom)}
      onOpenToggle={onOpenToggle}
    />
  ) : (
    <ChatRoomsList onChatRoomJoin={joinChatRoom} onOpenToggle={onOpenToggle} />
  )
}

export default ChatSidebar
