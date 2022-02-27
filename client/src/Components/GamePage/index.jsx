import React, { useRef, useEffect, useState } from 'react'
import SlotsGame from '../../SlotsGame/SlotsGame'
import GameSidebar from '../GameSidebar'
import { SocketProvider, socketConnection } from '../context/socket'
import Logger from "../../Logger"
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
    Logger.logTime("Mounted GamePage. Must never happen again.")
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
        <GameSidebar onToggleOpen={onToggleSidebar} />
      </GameAndMenuContainer>
    </GamePageWrapper>
  )
}

const GamePageWithSocket = (props) => {
  return (
    <SocketProvider initialValue={socketConnection}>
      <GamePage {...props} />
    </SocketProvider>
  )
}

export default GamePageWithSocket
