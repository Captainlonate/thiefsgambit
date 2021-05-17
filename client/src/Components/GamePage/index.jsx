import React, { useRef, useEffect, useState } from 'react'
import SlotsGame from '../../SlotsGame/SlotsGame'
import SidebarContainer from '../Sidebar/SidebarContainer'
import {
  GamePageWrapper,
  GameAndMenuContainer,
  GameContainer,
} from './styles'

const GamePage = () => {
  const gameMountPointRef = useRef(null)
  const [game, setGame] = useState(null)

  // The DOM will not immediately update the
  // size of the container. So this it's necessary to let
  // the dom update, before recalculating the dimensions
  const onToggleSidebar = () => {
    if (game) {
      setImmediate(() => {
        game.handleWindowResize()
      })
    }
  }

  useEffect(() => {
    console.log('Mounting', Date.now())
    const gameApp = new SlotsGame({
      mountAt: gameMountPointRef.current
    })
    setGame(gameApp)
    // eslint-disable-next-line
  }, [])

  return (
    <GamePageWrapper>
      <GameAndMenuContainer>
        <GameContainer ref={gameMountPointRef} />
        <SidebarContainer onToggleOpen={onToggleSidebar} />
      </GameAndMenuContainer>
    </GamePageWrapper>
  )
}

export default GamePage
