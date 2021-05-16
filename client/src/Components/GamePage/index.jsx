import React, { useRef, useEffect, useState } from 'react'
import App from '../../SlotsGame/App'
import ChatSidebar from '../Sidebar/Chat'
import ClosedSidebar from '../Sidebar/Closed'
import SidebarContainer from '../Sidebar/SidebarContainer'
import {
  GamePageWrapper,
  GameAndMenuContainer,
  MenuContainer,
  GameContainer,
  Menu,
  MenuItem,
} from './styles'

const GamePage = () => {
  const gameMountPointRef = useRef(null)
  const [game, setGame] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  console.log('GamePage Render')

  useEffect(() => {
    console.log('Mounting', Date.now())
    console.log('gameMountPointRef', gameMountPointRef)
    const gameApp = new App({
      mountAt: gameMountPointRef.current
    })
    setGame(gameApp)
    // eslint-disable-next-line
  }, [])

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen)
    // The DOM will not immediately update the
    // size of the container. So this it's necessary to let
    // the dom update, before recalculating the dimensions
    setImmediate(() => {
      game.handleWindowResize()
    })
  }

  return (
    <GamePageWrapper>
      <GameAndMenuContainer>
        {/* Game */}
        <GameContainer ref={gameMountPointRef} />
        {/* Menu */}
        <SidebarContainer />
        {/* <MenuContainer open={menuOpen}>
          {
            menuOpen
              ? <ChatSidebar />
              : <ClosedSidebar />
          }
        </MenuContainer> */}
      </GameAndMenuContainer>
    </GamePageWrapper>
  )
}

export default GamePage
