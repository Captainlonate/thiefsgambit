import { useState } from 'react'
import ChatSidebar from '../Sidebar/Chat'
import ClosedSidebar from '../Sidebar/Closed'
import styled from 'styled-components'

export const MenuContainer = styled.div`
  width: ${({ open }) => open ? '20em' : '5em'};
  background-color: pink;
  display: flex;
`

export const Menu = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

export const MenuItem = styled.div`
  box-sizing: border-box;
  padding: 0.5em;
`

const SidebarContainer = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen)
    // The DOM will not immediately update the
    // size of the container. So this it's necessary to let
    // the dom update, before recalculating the dimensions
    // setImmediate(() => {
    //   game.handleWindowResize()
    // })
  }

  return (
    <MenuContainer open={menuOpen}>
      {
        menuOpen
          ? <ChatSidebar onOpenToggle={toggleMenuOpen} />
          : <ClosedSidebar onOpenToggle={toggleMenuOpen} />
      }
    </MenuContainer>
  )
}

export default SidebarContainer
