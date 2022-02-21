const makeXYCoord = () => ({ x: 0, y: 0 })

export const getDefaultGamePositions = () => (
  Object.seal({
    reelContainer: makeXYCoord(),
    spinButton: makeXYCoord(),
    totalTextCoords: makeXYCoord(),
    betTextCoords: makeXYCoord(),
    winningsTextCoords: makeXYCoord(),
    pieceYCoords: [],
    pieceCenterCoords: []
  })
)
