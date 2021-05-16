import {
  Chat,
  ChatMessage,
  ChatMessageProfile,
  WordsWrapper,
} from './styles'

export const groupChats = (chats) => {
  return chats.reduce((acc, el) => {
    if (acc.length === 0 || acc[acc.length - 1].author !== el.author) {
      const newGroup = {
        id: el.id,
        them: el.them,
        author: el.author,
        messages: [el.message]
      }
      acc.push(newGroup)
    } else {
      acc[acc.length - 1].messages.push(el.message)
    }
    return acc
  }, [])
}

export const chatsToJsx = (groupedChats) => {
  return groupedChats.map((chat) => (
    <Chat them={chat.them}>
      <ChatMessageProfile>{chat.author}</ChatMessageProfile>
      <ChatMessage>
      {
        chat.messages.map((msg) => (<WordsWrapper>{msg}</WordsWrapper>))
      }
      </ChatMessage>
    </Chat>
  ))
}
