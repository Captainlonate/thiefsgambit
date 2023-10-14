import { IGroupOfChats, IGroupedChatsChat } from '../../../context/chat/helpers'
import { Chat, ChatMessage, ChatMessageProfile, WordsWrapper } from './styles'

// Each <Chat /> needs a unique key. The only thing I could come up with
// was to take all keys of the messages within each group, and merge
// them into a single string
const joinMessageKeys = (messages: IGroupedChatsChat[]) =>
  'chat-' + messages.map((m) => m.key).join('-')

// Convert grouped chats into JSX for the sidebar chat history
export const chatsToJsx = (groupedChats: IGroupOfChats[]) => {
  return groupedChats.map((chat) => (
    <Chat key={joinMessageKeys(chat.messages)} $them={!chat.writtenByMe}>
      <ChatMessageProfile>{chat.authorUserName}</ChatMessageProfile>
      <ChatMessage>
        {chat.messages.map(({ key, message }) => (
          <WordsWrapper key={key}>{message}</WordsWrapper>
        ))}
      </ChatMessage>
    </Chat>
  ))
}
