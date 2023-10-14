import { IChatMessage } from '../../../api/ApiReturnDataTypes'

export interface IGroupedChatsChat {
  message: string
  key: string
}

export interface IGroupOfChats {
  authorId: string
  writtenByMe: boolean
  authorUserName: string
  messages: IGroupedChatsChat[]
}

const chatGroupReducer = (
  groups: IGroupOfChats[],
  chatFromServer: IChatMessage
): IGroupOfChats[] => {
  const { message, messageId, authorId, writtenByMe, authorUserName } =
    chatFromServer

  const newMessage: IGroupedChatsChat = { message, key: messageId }

  // Start a new group if it's the first message or
  // a different author than last message
  const startNewGroup =
    groups.length === 0 ||
    groups[groups.length - 1].authorUserName !== authorUserName

  // Determine which group to put this message into
  if (startNewGroup) {
    groups.push({
      authorId,
      writtenByMe,
      authorUserName,
      messages: [newMessage],
    })
  } else {
    groups[groups.length - 1].messages.push(newMessage)
  }

  return groups
}

/*
  If a user types 2+ messages in a row, then all of
  those messages should be placed within a single chat
  bubble, under a single Username heading. No need
  to re-list the Username each time. This function will
  combine consecutive chat messages of each author
  into a single object, then return the array of those objects.
*/
export const groupChats = (chats: IChatMessage[]): IGroupOfChats[] =>
  chats.reduce(chatGroupReducer, [])
