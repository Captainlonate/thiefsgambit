import {
  Chat,
  ChatMessage,
  ChatMessageProfile,
  WordsWrapper,
} from './styles'

/*
  If a user types 2+ messages in a row, then all of
  those messages should be placed within a single chat
  bubble, under a single Username heading. No need
  to re-list the Username each time. This function will
  combine consecutive chat messages of each author
  into a single object, then return the array of those objects.
*/
export const groupChats = (chats) => (
  chats.reduce((groups, chat) => {
    const {
      message,
      messageId,
      authorId,
      writtenByMe,
      authorUserName
    } = chat

    const newMessage = { message, key: messageId }

    // Start a new group if it's the first message or
    // a different author than last message
    const startNewGroup = (
      groups.length === 0 ||
      groups[groups.length - 1].authorUserName !== authorUserName
    )

    // Determine which group to put this message into
    if (startNewGroup) {
      groups.push({ authorId, writtenByMe, authorUserName, messages: [newMessage] })
    } else {
      groups[groups.length - 1].messages.push(newMessage)
    }

    return groups
  }, [])
)

// Each <Chat /> needs a unique key. The only thing I could come up with
// was to take all keys of the messages within each group, and merge
// them into a single string
const joinMessageKeys = (messages) => 'chat-' + messages.map((m) => m.key).join('-')

// Convert grouped chats into JSX for the sidebar chat history
export const chatsToJsx = (groupedChats) => {
  return groupedChats.map((chat) => (
    <Chat key={joinMessageKeys(chat.messages)} them={!chat.writtenByMe}>
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
