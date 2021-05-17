import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useRef, useEffect, useState } from 'react'
import { groupChats, chatsToJsx } from './utils'
import { getRecentChatsForRoom, getChatRooms } from '../../../Network/chat'
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
  BackButton,
} from './styles'

const ChatRoomChat = ({ onBack, onOpenToggle, chatRoom: { chatRoomId, chatRoomName } }) => {
  const chatsListEl = useRef(null)
  const [groupedChats, setChats] = useState([])

  useEffect(() => {
    getRecentChatsForRoom({ roomId: chatRoomId })
      .then((chats) => {
        // Most recent chats are first, so they must be reversed
        setChats(groupChats(chats.reverse()))
      })

    getChatRooms()
      .then((data) => {
        console.log('getChatRooms', data)
      })
    const el = chatsListEl.current
    el.scrollTo(0, el.scrollHeight - el.clientHeight)
    // eslint-disable-next-line
  }, [])

  return (
    <ChatSidebarWrapper>
      <SidebarHeader {...{ onBack, onOpenToggle, titleText: chatRoomName }} />
      <ChatSection ref={chatsListEl}>
        { chatsToJsx(groupedChats) }
      </ChatSection>
      <InputSection>
        <InputSectionLeft>
          <MessageTextArea
            maxLength={200}
            rows='1'
            placeholder='Chat with your friends'
          />
        </InputSectionLeft>
        <InputSectionRight>
          <SendMessageBtn><span>&gt;</span></SendMessageBtn>
        </InputSectionRight>
      </InputSection>
    </ChatSidebarWrapper>
  )
}

export default ChatRoomChat
