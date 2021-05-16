import { useRef, useEffect, useState } from 'react'
import { groupChats, chatsToJsx } from './utils'
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

const mockMessages = [
  { id: '1', them: false, author: 'Me', message: 'Hello' },
  { id: '2', them: true, author: 'Regina', message: 'Morning' },
  { id: '3', them: false, author: 'Me', message: 'Hello' },
  { id: '4', them: true, author: 'Regina', message: 'Morning' },
  { id: '5', them: false, author: 'Me', message: 'Hello' },
  { id: '6', them: true, author: 'Regina', message: 'Morning' },
  { id: '7', them: false, author: 'Me', message: 'Hello' },
  { id: '8', them: true, author: 'Regina', message: 'Morning' },
  { id: '9', them: false, author: 'Me', message: 'Hello' },
  { id: '10', them: true, author: 'Regina', message: 'Morning' },
  { id: '11', them: false, author: 'Me', message: 'Hello' },
  { id: '12', them: true, author: 'Regina', message: 'Morning' },
  { id: '13', them: true, author: 'Regina', message: 'Morning' },
  { id: '14', them: true, author: 'Regina', message: 'Morning' },
]

const ChatSidebar = ({ onOpenToggle }) => {
  const chatsListEl = useRef(null)
  const [groupedChats, setChats] = useState(groupChats(mockMessages))

  useEffect(() => {
    const el = chatsListEl.current
    el.scrollTo(0, el.scrollHeight - el.clientHeight);
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
            // contentEditable={true}
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
