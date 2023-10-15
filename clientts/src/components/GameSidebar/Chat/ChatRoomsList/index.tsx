import { IChatRoom } from '@api/ApiReturnDataTypes'
import { useChatContext } from '@context/chat/index'
import SidebarHeader from '../../SidebarHeader'
import { ChatSidebarWrapper } from '../styles'
import ChatRoomListing from './ChatRoomListing'
import { ChatRoomsBody } from './styles'

interface IChatRoomsListProps {
  onOpenToggle: () => void
  onChatRoomJoin: (chatRoom: IChatRoom) => void
}

const ChatRoomsList = ({
  onOpenToggle,
  onChatRoomJoin,
}: IChatRoomsListProps) => {
  const [chatContext] = useChatContext()
  const haveRoomsToDisplay =
    !chatContext.loadingChatRooms && chatContext.chatRooms.length > 0

  return (
    <ChatSidebarWrapper>
      <SidebarHeader titleText="Chat Rooms" onOpenToggle={onOpenToggle} />
      <ChatRoomsBody>
        {haveRoomsToDisplay ? (
          chatContext.chatRooms.map((chatRoom: IChatRoom) => (
            <ChatRoomListing
              key={chatRoom.chatRoomId}
              chatRoomName={chatRoom.chatRoomName}
              onClickJoin={() => onChatRoomJoin(chatRoom)}
            />
          ))
        ) : (
          <div>Loading Chat Rooms...</div>
        )}
      </ChatRoomsBody>
    </ChatSidebarWrapper>
  )
}

export default ChatRoomsList
