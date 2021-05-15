import React, { useRef, useEffect, useState } from 'react'
import App from '../../SlotsGame/App'
import { GamePageWrapper } from './styles'

const GamePage = () => {
  const [number, setNumber] = useState(0)
  const [game, setGame] = useState(null)
  const gameMountPointRef = useRef(null)

  console.log('GamePage Render')

  useEffect(() => {
    console.log('Mounting', Date.now())
    console.log(gameMountPointRef)
    const gameApp = new App(gameMountPointRef.current)
    setGame(gameApp)
    // eslint-disable-next-line
  }, [])

  return (
    <GamePageWrapper>
      <div ref={gameMountPointRef}></div>
    </GamePageWrapper>
  )
}

export default GamePage
