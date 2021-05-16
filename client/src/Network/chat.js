
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

export const getRecentChatsForRoom = () => {
  return new Promise((resolve, reject) => {
    resolve(mockMessages)
  })
}
