import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useChatContext } from '../../context/chat/index'
import {
  ChatSidebarWrapper,
  SidebarHeader,
  ChatSection,
  InputSection,
  CloseButton,
  HeaderText,
  MessageTextArea,
  SendMessageBtn,
  InputSectionLeft,
  InputSectionRight,
} from './styles'

const ChatRoomsList = ({ onOpenToggle, onChatRoomJoin }) => {
  const [chatContext, setChatContext] = useChatContext()

  return (
    <ChatSidebarWrapper>
      <SidebarHeader titleText='Chat Rooms' onOpenToggle={onOpenToggle} />
      <ChatSection>
        {
          (!chatContext.loadingChatRooms && chatContext.chatRooms.length > 0)
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
