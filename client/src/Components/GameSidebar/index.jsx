import { useState, useEffect } from 'react'
import ChatSidebar from './Chat'
import ClosedSidebar from './ClosedSidebar'
import { GameSidebarWrapper } from './styles'
import { ChatProvider, useChatContext } from '../context/chat/index'
import { getChatRooms } from '../../Network/chat'
import { socketConnection } from '../context/socket'

/*
  The Game Sidebar next to the game screen.
  Can be closed or open, and if open can contain
  one of many types of Sub/children sidebars.
  For instance, when opened, the SidebarContainer might
  wrap the ChatSidebar, which in turn might display a list
  of chat rooms, or current chat messages within a single room.
*/
const GameSidebar = ({ onToggleOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [, setChatContext] = useChatContext()

  const toggleMenuOpen = () => {
    if (typeof onToggleOpen === 'function') {
      onToggleOpen(!menuOpen)
    }
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    // Retrieve the list of chatrooms and display them
    getChatRooms().then((chatRooms) => {
      setChatContext({ type: 'UPDATE_CHATROOMS_LIST', payload: chatRooms })
    })
    
    // Listen for new chat messages and add them to the room
    socketConnection.on('chat_room_message', (newChatMessage) => {
      setChatContext({ type: 'ADD_CHAT_MESSAGE', payload: newChatMessage })
    })
    // eslint-disable-next-line
  }, [])

  return (
    <GameSidebarWrapper open={menuOpen}>
      {
        menuOpen
          ? <ChatSidebar onOpenToggle={toggleMenuOpen} />
          : <ClosedSidebar onOpenToggle={toggleMenuOpen} />
      }
    </GameSidebarWrapper>
  )
}

const GameSidebarWithProvider = (props) => (
  <ChatProvider>
    <GameSidebar {...props} />
  </ChatProvider>
)

export default GameSidebarWithProvider
