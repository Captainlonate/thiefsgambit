import { useState } from 'react'
import ChatSidebar from '../Sidebar/Chat'
import ClosedSidebar from '../Sidebar/ClosedSidebar'
import styled from 'styled-components'

export const SidebarContainerWrapper = styled.div`
  width: ${({ open }) => open ? '20em' : '5em'};
  background-color: #0f3b50;
  display: flex;
`

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
