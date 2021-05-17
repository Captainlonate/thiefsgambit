import { useChatContext } from '../../../context/chat/index'
import SidebarHeader from '../../SidebarHeader'
import { ChatSidebarWrapper, ChatSection } from '../styles'

const ChatRoomsList = ({ onOpenToggle, onChatRoomJoin }) => {
  const [chatContext, setChatContext] = useChatContext()
  const haveRoomsToDisplay = (!chatContext.loadingChatRooms && chatContext.chatRooms.length > 0)

  return (
    <ChatSidebarWrapper>
      <SidebarHeader titleText='Chat Rooms' onOpenToggle={onOpenToggle} />
      <ChatSection>
        {
          (haveRoomsToDisplay)
            ? (
              chatContext.chatRooms.map((chatRoom) => (
                <div key={chatRoom.chatRoomId}>
                  <div>{chatRoom.chatRoomName}</div>
                  <div><button onClick={() => onChatRoomJoin(chatRoom)}>Join</button></div>
                </div>
              ))
            )
            : (
              <div>
                Loading Chat Rooms...
              </div>
            )
        }
      </ChatSection>
    </ChatSidebarWrapper>
  )
}

export default ChatRoomsList
