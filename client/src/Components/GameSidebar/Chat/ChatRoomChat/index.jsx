import { useRef, useEffect, useState } from 'react'
import SidebarHeader from '../../SidebarHeader'
import { groupChats, chatsToJsx } from './utils'
import { getRecentChatsForRoom, getChatRooms } from '../../../../Network/chat'
import { ChatSidebarWrapper } from '../styles'
import {
  InputSection,
  MessageTextArea,
  SendMessageBtn,
  InputSectionLeft,
  InputSectionRight,
  ChatMessagesBody,
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
    const el = chatsListEl.current
    el.scrollTo(0, el.scrollHeight - el.clientHeight)
    // eslint-disable-next-line
  }, [])

  return (
    <ChatSidebarWrapper>
      <SidebarHeader {...{ onBack, onOpenToggle, titleText: chatRoomName }} />
      <ChatMessagesBody ref={chatsListEl}>
        { chatsToJsx(groupedChats) }
      </ChatMessagesBody>
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
