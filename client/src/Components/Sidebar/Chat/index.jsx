import { useRef, useEffect, useState } from 'react'
import { groupChats, chatsToJsx } from './utils'
import { getRecentChatsForRoom, getChatRooms } from '../../../Network/chat'
import {
  ChatSidebarWrapper,
  CloseSection,
  ChatSection,
  InputSection,
  CloseButton,
  ChatHeader,
  MessageTextArea,
  SendMessageBtn,
  InputSectionLeft,
  InputSectionRight,
} from './styles'

const ChatSidebar = ({ onOpenToggle }) => {
  const chatsListEl = useRef(null)
  const [groupedChats, setChats] = useState([])

  useEffect(() => {
    getRecentChatsForRoom({ roomId: 1 })
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
  }, [])

  return (
    <ChatSidebarWrapper>
      <CloseSection>
        <ChatHeader>Chat</ChatHeader>
        <CloseButton onClick={onOpenToggle}><i>&gt;</i></CloseButton>
      </CloseSection>
      <ChatSection ref={chatsListEl}>
        {
          chatsToJsx(groupedChats)
        }
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

export default ChatSidebar
