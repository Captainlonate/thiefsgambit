export interface IXYCoord {
  x: number
  y: number
}

const makeXYCoord = (): IXYCoord => ({ x: 0, y: 0 })

export interface IGamePositions {
  reelContainer: IXYCoord
  spinButton: IXYCoord
  totalTextCoords: IXYCoord
  betTextCoords: IXYCoord
  winningsTextCoords: IXYCoord
  pieceYCoords: number[]
  pieceCenterCoords: IXYCoord[][]
}

export function getDefaultGamePositions(): IGamePositions {
  return Object.seal({
    reelContainer: makeXYCoord(),
    spinButton: makeXYCoord(),
    totalTextCoords: makeXYCoord(),
    betTextCoords: makeXYCoord(),
    winningsTextCoords: makeXYCoord(),
    pieceYCoords: [],
    pieceCenterCoords: [],
  })
}
