export const getRecentChatsForRoom = async ({ roomId }) => {
  const url = `${process.env.REACT_APP_URL_CHAT_GETRECENTROOM}/${roomId}`
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

export const getChatRooms = async () => {
  const url = `${process.env.REACT_APP_URL_CHAT_GETROOMS}`
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
