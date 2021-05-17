import { useState } from 'react'
import ChatRoomChat from './ChatRoomChat'
import ChatRoomsList from './ChatRoomsList'

const ChatSidebar = ({ onOpenToggle }) => {
  const [viewingChats, setViewingChats] = useState(false)
  const [activeChatRoom, setActiveChatRoom] = useState({ chatRoomId: null, chatRoomName: '' })

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
