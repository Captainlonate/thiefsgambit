import { useRef, useState, useLayoutEffect } from 'react'
import SidebarHeader from '../../SidebarHeader'
import { chatsToJsx } from './utils'
import { socketConnection } from '../../../context/socket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { ChatSidebarWrapper } from '../styles'
import {
  InputSection,
  MessageTextArea,
  SendMessageBtn,
  InputSectionLeft,
  InputSectionRight,
  ChatMessagesBody,
} from './styles'

const handleMessageSubmit = (chatRoomId, typedText, setTypedText) => () => {
  const trimmed = typedText.trim()
  if (trimmed.length !== 0) {
    // Submit to server
    socketConnection.emit('new_chat_message', {
      chatRoomId,
      message: typedText
    })
    setTypedText('')
  }
}

const ChatRoomChat = ({ onBack, onOpenToggle, groupedChats, chatRoom: { chatRoomId, chatRoomName } }) => {
  const chatsListEl = useRef(null)
  const [typedText, setTypedText] = useState('')

  useLayoutEffect(() => {
    const el = chatsListEl.current
    el.scrollTo(0, el.scrollHeight - el.clientHeight)
  }, [groupedChats])

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
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
          />
        </InputSectionLeft>
        <InputSectionRight>
          <SendMessageBtn
            onClick={handleMessageSubmit(chatRoomId, typedText, setTypedText)}
            disabled={typedText.trim().length === 0}
          >
            <FontAwesomeIcon icon={faCommentDots} />
          </SendMessageBtn>
        </InputSectionRight>
      </InputSection>
    </ChatSidebarWrapper>
  )
}

export default ChatRoomChat
