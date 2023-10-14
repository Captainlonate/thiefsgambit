export interface IGameSizes {
  numReels: number
  numRows: number
  reelContainerWidth: number
  reelContainerHeight: number
  reelSpaceWidth: number
  totalReelSpaces: number
  reelWidth: number
  reelHeight: number
  pieceMargin: number
  pieceSize: number
  reelRowHeight: number
  spinButtonSize: number
}

export function getDefaultGameSizes(): IGameSizes {
  return Object.seal({
    numReels: 0,
    numRows: 0,
    reelContainerWidth: 0,
    reelContainerHeight: 0,
    reelSpaceWidth: 0,
    totalReelSpaces: 0,
    reelWidth: 0,
    reelHeight: 0,
    pieceMargin: 0,
    pieceSize: 0,
    reelRowHeight: 0,
    spinButtonSize: 0,
  })
}
