import { useState } from 'react'
import ChatSidebar from '../Chat'
import ClosedSidebar from '../ClosedSidebar'
import { SidebarContainerWrapper } from './styles'

const SidebarContainer = ({ onToggleOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenuOpen = () => {
    if (typeof onToggleOpen === 'function') {
      onToggleOpen(!menuOpen)
    }
    setMenuOpen(!menuOpen)
  }

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

export default SidebarContainer
