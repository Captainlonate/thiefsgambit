import { useState, useEffect } from 'react'
import ChatSidebar from '../Chat'
import ClosedSidebar from '../ClosedSidebar'
import { SidebarContainerWrapper } from './styles'
import { ChatProvider, useChatContext } from '../../context/chat/index'
import { getChatRooms } from '../../../Network/chat'

/*
  The sidebar shell next to the game screen.
  Can be closed or open, and if open can contain
  one of many types of Sub/children sidebars.
  For instance, when opened, the SidebarContainer might
  wrap the ChatSidebar, which in turn might display a list
  of chat rooms, or current chat messages within a single room.
*/
const SidebarContainer = ({ onToggleOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [, setChatContext] = useChatContext()

  const toggleMenuOpen = () => {
    if (typeof onToggleOpen === 'function') {
      onToggleOpen(!menuOpen)
    }
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    getChatRooms()
      .then((chatRooms) => {
        setChatContext({ type: 'UPDATE_CHATROOMS_LIST', payload: chatRooms })
      })
    // eslint-disable-next-line
  }, [])

  return (
    <SidebarContainerWrapper open={menuOpen}>
      {
        menuOpen
          ? <ChatSidebar onOpenToggle={toggleMenuOpen} />
          : <ClosedSidebar onOpenToggle={toggleMenuOpen} />
      }
    </SidebarContainerWrapper>
  )
}

const SidebarWithProvider = (props) => (
  <ChatProvider>
    <SidebarContainer {...props} />
  </ChatProvider>
)

export default SidebarWithProvider
