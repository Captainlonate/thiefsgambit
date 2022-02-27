/*
  Get recent chat messages (ungrouped) for a given chat room (id)
*/
export const getRecentChatsForRoom = async ({ roomId }) => {
  const url = `${process.env.REACT_APP_URL_SOCKETIO}/chats/room/${roomId}`
  const response = await window.fetch(url, {
    method: 'GET',
    credentials: 'include'
  })

  if (response.ok) {
    const { success, error, data } = await response.json()
    if (success) {
      return data
    }
    console.log('getRecentChatsForRoom: Server responded with success false.', error)
  } else {
    console.error('getRecentChatsForRoom: Response was not ok. Something is wrong.')
  }

  return []
}

/*
  Get a list of all chat rooms that are visible to this user
  (based on the user's Elite status)
*/
export const getChatRooms = async () => {
  // const url = `${process.env.REACT_APP_URL_CHAT_GETROOMS}`
  const url = `${process.env.REACT_APP_URL_SOCKETIO}/chats/room`
  const response = await window.fetch(url, {
    method: 'GET',
    credentials: 'include'
  })

  if (response.ok) {
    const { success, error, data } = await response.json()
    if (success) {
      return data
    }
    console.log('getChatRooms: Server responded with success false.', error)
  } else {
    console.error('getChatRooms: Response was not ok. Something is wrong.')
  }

  return []
}
