import { useChatContext } from '../../../context/chat/index'
import SidebarHeader from '../../SidebarHeader'
import { ChatSidebarWrapper } from '../styles'
import ChatRoomListing from './ChatRoomListing'
import { ChatRoomsBody } from './styles'

const ChatRoomsList = ({ onOpenToggle, onChatRoomJoin }) => {
  const [chatContext, setChatContext] = useChatContext()
  const haveRoomsToDisplay = (!chatContext.loadingChatRooms && chatContext.chatRooms.length > 0)

  return (
    <ChatSidebarWrapper>
      <SidebarHeader titleText='Chat Rooms' onOpenToggle={onOpenToggle} />
      <ChatRoomsBody>
        {
          (haveRoomsToDisplay)
            ? (
              chatContext.chatRooms.map((chatRoom) => (
                <ChatRoomListing 
                  key={chatRoom.chatRoomId}
                  chatRoomName={chatRoom.chatRoomName}
                  onClickJoin={() => onChatRoomJoin(chatRoom)}
                />
              ))
            )
            : (
              <div>
                Loading Chat Rooms...
              </div>
            )
        }
      </ChatRoomsBody>
    </ChatSidebarWrapper>
  )
}

export default ChatRoomsList
