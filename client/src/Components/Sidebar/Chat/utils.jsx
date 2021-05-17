import {
  Chat,
  ChatMessage,
  ChatMessageProfile,
  WordsWrapper,
} from './styles'

export const groupChats = (chats) => {
  return chats.reduce((acc, chat) => {
    if (acc.length === 0 || acc[acc.length - 1].authorUserName !== chat.authorUserName) {
      const newGroup = {
        authorId: chat.authorId,
        writtenByMe: chat.writtenByMe,
        authorUserName: chat.authorUserName,
        messages: [{
          message: chat.message,
          key: chat.messageId
        }]
      }
      acc.push(newGroup)
    } else {
      acc[acc.length - 1].messages.push({
        message: chat.message,
        key: chat.messageId
      })
    }
    return acc
  }, [])
}

export const chatsToJsx = (groupedChats) => {
  return groupedChats.map((chat) => (
    <Chat them={!chat.writtenByMe}>
      <ChatMessageProfile>{chat.authorUserName}</ChatMessageProfile>
      <ChatMessage>
      {
        chat.messages.map(({ key, message }) => (
          <WordsWrapper key={key}>{message}</WordsWrapper>
        ))
      }
      </ChatMessage>
    </Chat>
  ))
}
