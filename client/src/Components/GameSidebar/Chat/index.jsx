import { useState } from 'react'
import ChatRoomChat from './ChatRoomChat'
import ChatRoomsList from './ChatRoomsList'

const NULL_CHATROOM = { chatRoomId: null, chatRoomName: '' }

/*
  Place directly within a SidebarShell.
  This component has two possible views:
    Viewing a list of chat rooms (ChatRoomsList)
    Viewing chat messages within a given room (ChatRoomChat)
*/
const ChatSidebar = ({ onOpenToggle }) => {
  const [viewingChats, setViewingChats] = useState(false)
  const [activeChatRoom, setActiveChatRoom] = useState(NULL_CHATROOM)

  const joinChatRoom = (chatRoom) => {
    if (chatRoom && chatRoom.chatRoomId) {
      setActiveChatRoom({ ...chatRoom })
      setViewingChats(true)
    }
  }

  return (
    (viewingChats && activeChatRoom.chatRoomId)
      ? <ChatRoomChat
          onBack={() => setViewingChats(false)}
          chatRoom={activeChatRoom}
          onOpenToggle={onOpenToggle}
        />
      : <ChatRoomsList
          onChatRoomJoin={joinChatRoom}
          onOpenToggle={onOpenToggle}
        />
  )
}

export default ChatSidebar
