import React, { useRef, useEffect, useState } from 'react'
import App from '../../SlotsGame/App'
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
        <MenuContainer open={menuOpen}>
          <Menu>
            <MenuItem onClick={toggleMenuOpen}>A</MenuItem>
            <MenuItem>B</MenuItem>
            <MenuItem>C</MenuItem>
          </Menu>
        </MenuContainer>
      </GameAndMenuContainer>
    </GamePageWrapper>
  )
}

export default GamePage
