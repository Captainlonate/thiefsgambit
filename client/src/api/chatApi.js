// const handleMessageSubmit = (chatRoomId, typedText, setTypedText) => () => {
//   const trimmed = typedText.trim()
//   if (trimmed.length !== 0) {
//     // Submit to server
//     socketConnection.emit('new_chat_message', {
//       chatRoomId,
//       message: typedText
//     })
//     setTypedText('')
//   }
// }