import { useRef, useEffect, useState, useCallback } from 'react'
import SlotsGame from '../../SlotsGame/SlotsGame'
import GameSidebar from '../GameSidebar'
import { SocketProvider } from '@context/socket'
import { socketConnection } from '@context/socket/socketConnection'
import Logger from '@logger'
import { GamePageWrapper, GameAndMenuContainer, GameContainer } from './styles'

const GamePage = () => {
  const refSlotsGame = useRef<SlotsGame | null>(null)
  const gameMountPointRef = useRef<HTMLDivElement | null>(null)
  const [readyToCreate, setReadyToCreate] = useState(false)

  /**
   * "Callback Refs" are called after every render.
   * So that's why this one is memoized.
   */
  const assignMountPointCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null) {
        gameMountPointRef.current = node
        setReadyToCreate(true)
      }
    },
    []
  )

  // The DOM will not immediately update the
  // size of the container. So this it's necessary to let
  // the dom update, before recalculating the dimensions
  const onToggleSidebar = useCallback(() => {
    if (refSlotsGame.current) {
      setTimeout(() => {
        if (refSlotsGame.current) {
          refSlotsGame.current.handleWindowResize()
        }
      }, 100)
    }
  }, [])

  useEffect(() => {
    if (readyToCreate && gameMountPointRef.current && !refSlotsGame.current) {
      Logger.logTime('Created new SlotsGame. Must only happen once.')
      refSlotsGame.current = new SlotsGame({
        mountAt: gameMountPointRef.current,
      })
    }
  }, [readyToCreate])

  return (
    <GamePageWrapper>
      <GameAndMenuContainer>
        <GameContainer ref={assignMountPointCallback} />
        <GameSidebar onToggleOpen={onToggleSidebar} />
      </GameAndMenuContainer>
    </GamePageWrapper>
  )
}

function GamePageWithSocket() {
  return (
    <SocketProvider initialValue={socketConnection}>
      <GamePage />
    </SocketProvider>
  )
}

export default GamePageWithSocket
