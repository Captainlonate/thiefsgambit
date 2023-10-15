import * as PIXI from 'pixi.js'
import { getTextureByServerKey } from '../Config/thingsToLoad'
import SpinButton from '../GameComponents/SpinButton'
import ReelContainer from '../GameComponents/ReelContainer'
import Reel from '../GameComponents/Reel'
import Piece from '../GameComponents/Piece'
import GameState from '../GameState'
import { decFontSize, arrayIsNotEmpty } from '../../utils'
import { baseMoneyStyles } from '../Config/ui'
import { IGameSizes, getDefaultGameSizes } from './GameSizes'
import {
  IGamePositions,
  IXYCoord,
  getDefaultGamePositions,
} from './GamePositions'
import { GAME_MODES } from '../GameState/GameModes'
import Logger from '@logger'
import { API } from '@api/Api'

interface IMainSceneArgs {
  pixiApp: PIXI.Application
  sizes: {
    logicalWidth: number
    logicalHeight: number
  }
}

/*

*/
class MainScene {
  pixiApp: PIXI.Application
  loader: PIXI.Loader
  resources: PIXI.utils.Dict<PIXI.LoaderResource>
  gameState: GameState
  logicalWidth: number = 800
  logicalHeight: number = 450
  sizes: IGameSizes
  positions: IGamePositions
  container: PIXI.Container
  containerBG: PIXI.Sprite
  reelContainer: ReelContainer
  reels: Reel[]
  spinButton: SpinButton
  totalUI: PIXI.Text
  betUI: PIXI.Text
  winningsUI: PIXI.Text
  // If the board animation is currently spinning
  spinning: boolean = false
  // setInterval timer id
  paylineTimer: number | undefined

  constructor({ pixiApp, sizes }: IMainSceneArgs) {
    // PIXI Aliases
    this.pixiApp = pixiApp
    this.loader = pixiApp.loader
    this.resources = pixiApp.loader.resources
    // Logger = logger

    this.gameState = new GameState()
    this.gameState.setGameMode(GAME_MODES.LOADING)

    // Sizes and Positions
    const { logicalWidth, logicalHeight } = sizes
    this.logicalWidth = logicalWidth
    this.logicalHeight = logicalHeight
    this.sizes = this.getSizes({ logicalWidth })
    this.positions = this.getPositions()

    // Contains the entire game
    this.container = new PIXI.Container()
    this.containerBG = this.createBgSprite(
      this.logicalWidth,
      this.logicalHeight
    )
    this.container.addChild(this.containerBG)

    // The container for the 5 reels
    this.reelContainer = this.createReelContainer()
    this.container.addChild(this.reelContainer)

    // Create the reels
    this.reels = this.createReels()
    this.reelContainer.addChild(...this.reels)

    //
    this.createSlotPieces()

    // Spin Button
    this.spinButton = this.createSpinButton()
    this.container.addChild(this.spinButton)

    // UI Text
    this.totalUI = this.createTotalText()
    this.betUI = this.createBetText()
    this.winningsUI = this.createWinningsText()
    this.container.addChild(this.totalUI, this.betUI, this.winningsUI)

    // Paylines
    this.container.addChild(this.gameState.paylines.lineGraphic)
    this.paylineTimer = undefined

    // Animations (tickers)
    this.pixiApp.ticker.add(() => this.spinAnimation())

    //
    this.initialize()
  }

  /*
    Fetch the initial state of the game (such as total money, bet
      amount)
  */
  initialize() {
    API.GetCurrentState().then((apiResponse) => {
      if (apiResponse.isError || !apiResponse.data) {
        this.showErrorToast(apiResponse.errorMessage)
      } else {
        const { totalcredits, previousbet } = apiResponse.data
        this.gameState.total = totalcredits
        this.gameState.bet = previousbet
        this.refreshUIText()
        this.start()
      }
    })
  }

  /*
    Set the game state to be ready to play, allowing the user to
    interact with the game, such as spinning.
  */
  start() {
    this.gameState.setGameMode(GAME_MODES.READY)
  }

  refreshUIText() {
    // Total money text
    const newTotalText = this.gameState.totalText
    this.totalUI.text = newTotalText
    this.totalUI.style.fontSize = decFontSize(
      Number(baseMoneyStyles.fontSize ?? 38),
      4,
      4,
      newTotalText
    )
    // Bet amount text
    this.betUI.text = 'Bet ' + this.gameState.betText
    // Recent-spin winnings text
    this.winningsUI.text = 'Win ' + this.gameState.lastWinnings
  }

  /*
    Invoked when the player wants to spin
  */
  spin() {
    if (this.gameState.canSpin && !this.gameState.spinning) {
      // Cleanup before spinning
      this.gameState.paylines.clearPaylines()
      window.clearInterval(this.paylineTimer)
      this.stopGlowingAllPieces()
      // Show spinning animation
      this.gameState.setGameMode(GAME_MODES.SPINNING)
      // Fetch spin results after some delay
      setTimeout(() => {
        API.Spin({ betMultiplier: this.gameState.bet }).then((apiResponse) => {
          if (apiResponse.isError || !apiResponse.data) {
            this.showErrorToast(
              `Network error when fetching results. "${apiResponse.errorMessage}"`
            )
          } else {
            try {
              this.handleSpinResults({
                spinResults: apiResponse.data.reels,
                spinValue: apiResponse.data.value,
                newTotal: apiResponse.data.newtotal,
                paylines: apiResponse.data.paylines,
                freeSpins: apiResponse.data.freespins,
              })
            } catch (ex) {
              this.showErrorToast('Invalid spin results from api.')
            }
          }
        })
      }, 2000)
    }
  }

  /*

  */
  handleSpinResults(spinApiResponse: {
    spinResults: string[][]
    spinValue: number
    newTotal: number
    paylines: number[][]
    freeSpins: number
  }) {
    Logger.debug('spin::The Returned Network Data', spinApiResponse)
    const { newTotal, spinResults, spinValue, paylines } = spinApiResponse
    // UI Text
    this.gameState.total = newTotal
    this.gameState.lastWinnings = spinValue
    this.refreshUIText()
    // Paylines
    if (arrayIsNotEmpty(paylines)) {
      // Pre-calculate the coordinates of every payline
      const coordinatesOfAllPaylines: IXYCoord[][] = paylines.map((payline) =>
        payline.map(
          (rowIdx, reelIdx) =>
            this.positions.pieceCenterCoords[reelIdx][rowIdx + 2]
        )
      )
      // Store this spin's payline information in gamestate
      this.gameState.paylines.updatePaylines({
        rowIndices: paylines,
        coordinates: coordinatesOfAllPaylines,
      })
      // Make the pieces glow
      this.gameState.paylines.currentPayline.forEach(
        (base3RowIndex, reelIdx) => {
          this.reels[reelIdx].pieces[base3RowIndex + 2].isGlowing = true
        }
      )
      // If there are multiple paylines, start a timer to cycle through them
      if (paylines.length > 1) {
        this.paylineTimer = setInterval(() => {
          this.timerIncrementPayline()
        }, 2000)
      }
      this.gameState.setGameMode(GAME_MODES.SHOWING_PAYLINES)
    } else {
      this.gameState.paylines.clearPaylines()
      this.gameState.setGameMode(GAME_MODES.READY)
    }
    // Reel
    this.setReels(spinResults)
  }

  /*
    Makes each reel appear to spin (just the animation part)
  */
  spinAnimation() {
    const speed = 10
    if (this.gameState.spinning) {
      const boundaryY =
        (this.reels[0].pieces.length - 2) * this.sizes.reelRowHeight
      for (let reelIdx = 0; reelIdx < this.reels.length; reelIdx++) {
        const pieces = this.reels[reelIdx].pieces
        for (let pieceIdx = 0; pieceIdx < pieces.length; pieceIdx++) {
          const piece = pieces[pieceIdx]
          piece.y += speed
          if (piece.y >= boundaryY) {
            piece.y = -2 * this.sizes.reelRowHeight + this.sizes.pieceMargin
          }
        }
      }
    }
  }

  /*
  
  */
  timerIncrementPayline() {
    if (this.gameState.paylines.hasPaylines) {
      this.stopGlowingAllPieces()
      this.gameState.paylines.nextPayline()
      this.gameState.paylines.currentPayline.forEach(
        (base3RowIndex, reelIdx) => {
          this.reels[reelIdx].pieces[base3RowIndex + 2].isGlowing = true
        }
      )
    }
  }

  /*

  */
  setReels(newReels: string[][]) {
    // Put the reels back in their original positions
    // And update the images to be what the server decided
    for (let reelIdx = 0; reelIdx < this.reels.length; reelIdx++) {
      const pieces = this.reels[reelIdx].pieces
      for (let pieceIdx = 0; pieceIdx < pieces.length; pieceIdx++) {
        pieces[pieceIdx].y = this.positions.pieceYCoords[pieceIdx]
        if (pieceIdx >= pieces.length - 3) {
          const offsetIdx = pieceIdx - (pieces.length - 3)
          const serverKey: string = newReels[reelIdx][offsetIdx]
          const textureSetByApi = getTextureByServerKey(
            this.resources,
            serverKey
          )
          if (textureSetByApi) {
            pieces[pieceIdx].texture = textureSetByApi
          } else {
            this.showErrorToast(
              `Could not identify texture for serverKey: "${serverKey}"`
            )
          }
        }
      }
    }
  }

  /*

  */
  stopGlowingAllPieces() {
    for (const reelPiece of this.reelPiecesIterable()) {
      reelPiece.isGlowing = false
    }
  }

  /*
    To perform an action on each reel piece:
      for (const piece of this.reelPiecesIterable()) { ... }
    Invoke the reelPiecesIterable() generator function to return
    an "iterator" object (which has a .next(), which returns an object with
    "value" and "done")
  */
  *reelPiecesIterable() {
    // For each reel
    for (let reelIdx = 0; reelIdx < this.reels.length; reelIdx++) {
      // For each piece within each reel
      const pieces = this.reels[reelIdx].pieces
      for (let rowIdx = 0; rowIdx < pieces.length; rowIdx++) {
        yield pieces[rowIdx]
      }
    }
  }

  /*

  */
  createBgSprite(width: number, height: number) {
    // const bgSprite = new PIXI.Sprite(PIXI.Texture.WHITE)
    const bgSprite = new PIXI.Sprite(this.resources.scene.texture)
    bgSprite.width = width
    bgSprite.height = height
    // bgSprite.tint = 0xffffff
    // bgSprite.tint = color
    return bgSprite
  }

  /*

  */
  createReelContainer() {
    return new ReelContainer({
      x: this.positions.reelContainer.x,
      y: this.positions.reelContainer.y,
      displayWidth: this.sizes.reelContainerWidth,
      displayHeight: this.sizes.reelContainerHeight,
      // bgColor: 0x111111
    })
  }

  /*

  */
  createReels(): Reel[] {
    const { reelSpaceWidth, reelWidth, numReels } = this.sizes

    return Array.from({ length: numReels }, (_, idx) => idx).map(
      (idx) =>
        new Reel({
          x: idx * reelWidth + idx * reelSpaceWidth,
          y: 0,
        })
    )
  }

  /*

  */
  createSlotPieces() {
    for (const reel of this.reels) {
      for (const yCoord of this.positions.pieceYCoords) {
        const randomPiece = new Piece({
          resources: this.resources,
          x: this.sizes.pieceMargin,
          y: yCoord,
          size: this.sizes.pieceSize,
        })

        reel.addPiece(randomPiece)
      }
    }
  }

  /*

  */
  createSpinButton(): SpinButton {
    return new SpinButton({
      texture: this.resources.helm.texture,
      size: this.sizes.spinButtonSize,
      clickFn: () => this.spin(),
      position: { ...this.positions.spinButton },
    })
  }

  /*

  */
  createTotalText(): PIXI.Text {
    const styles = { ...baseMoneyStyles }
    const text = new PIXI.Text(this.gameState.totalText, styles)
    text.x = this.positions.totalTextCoords.x
    text.y = this.positions.totalTextCoords.y
    text.position.x = this.positions.totalTextCoords.x
    text.position.y = this.positions.totalTextCoords.y
    text.angle = 8
    text.anchor.set(0.5)

    return text
  }

  createBetText(): PIXI.Text {
    const styles = { ...baseMoneyStyles }
    const text = new PIXI.Text(this.gameState.betText, styles)
    text.x = this.positions.betTextCoords.x
    text.y = this.positions.betTextCoords.y
    text.anchor.set(0.5)
    return text
  }

  createWinningsText(): PIXI.Text {
    const styles = { ...baseMoneyStyles }
    const text = new PIXI.Text(this.gameState.winningsText, styles)
    text.x = this.positions.winningsTextCoords.x
    text.y = this.positions.winningsTextCoords.y
    text.anchor.set(0.5)
    return text
  }

  /*

  */
  getSizes({ logicalWidth }: { logicalWidth: number }): IGameSizes {
    const numReels = 5
    const numRows = 3
    const reelContainerWidth = Math.round(0.56 * logicalWidth)
    const reelSpaceWidth = Math.floor(reelContainerWidth * 0.02)
    const totalReelSpaces = reelSpaceWidth * (numReels - 1)
    const reelWidth = Math.floor(
      (reelContainerWidth - totalReelSpaces) / numReels
    )
    const pieceMargin = Math.floor(0.1 * reelWidth)
    const reelHeight = reelWidth * numRows

    const gameSizes = getDefaultGameSizes()

    gameSizes.numReels = numReels
    gameSizes.numRows = numRows
    gameSizes.reelContainerWidth = reelContainerWidth
    gameSizes.reelSpaceWidth = reelSpaceWidth
    gameSizes.totalReelSpaces = totalReelSpaces
    gameSizes.reelWidth = reelWidth
    gameSizes.pieceMargin = pieceMargin
    gameSizes.pieceSize = Math.floor(reelWidth - pieceMargin * 2)
    gameSizes.reelHeight = reelHeight
    gameSizes.reelContainerHeight = reelHeight
    gameSizes.reelRowHeight = reelWidth
    gameSizes.spinButtonSize = Math.floor(0.5 * reelContainerWidth)

    return gameSizes
  }

  /*

    This function depends on this.sizes being calculated/populated already
  */
  getPositions(): IGamePositions {
    const {
      reelContainerWidth,
      reelContainerHeight,
      reelRowHeight,
      pieceMargin,
      reelWidth,
      reelSpaceWidth,
    } = this.sizes
    const positions = getDefaultGamePositions()

    positions.reelContainer.x = Math.floor(
      (this.logicalWidth - reelContainerWidth) / 2
    )
    positions.reelContainer.y =
      Math.floor((this.logicalHeight - reelContainerHeight) / 2) - 4
    positions.spinButton.x = Math.floor(this.logicalWidth * 0.74)
    positions.spinButton.y = Math.floor(this.logicalHeight * 0.45)
    positions.totalTextCoords.x = Math.floor(this.logicalWidth * 0.35)
    positions.totalTextCoords.y = Math.floor(this.logicalHeight * 0.93)
    positions.betTextCoords.x = Math.floor(this.logicalWidth * 0.6)
    positions.betTextCoords.y = Math.floor(this.logicalHeight * 0.92)
    positions.winningsTextCoords.x = Math.floor(this.logicalWidth * 0.1)
    positions.winningsTextCoords.y = Math.floor(this.logicalHeight * 0.82)
    positions.pieceYCoords = [
      -2 * reelRowHeight + pieceMargin, // Not shown on screen normally
      -1 * reelRowHeight + pieceMargin,
      0 * reelRowHeight + pieceMargin,
      1 * reelRowHeight + pieceMargin,
      2 * reelRowHeight + pieceMargin, // Not shown on screen normally
    ]

    const centerOffsetX = positions.reelContainer.x + Math.floor(reelWidth / 2)
    const centerOffsetY =
      positions.reelContainer.y + Math.floor(reelRowHeight / 2)
    positions.pieceCenterCoords = [0, 1, 2, 3, 4].map((reelIdx) =>
      [-2, -1, 0, 1, 2].map((rowIdx) => ({
        x: centerOffsetX + reelIdx * reelWidth + reelIdx * reelSpaceWidth,
        y: centerOffsetY + rowIdx * reelRowHeight,
      }))
    )
    // positions.pieceCenterCoords = [0, 1, 2, 3, 4].map((reelIdx) => (
    //   [-2, -1, 0, 1, 2].map((rowIdx) => (
    //     [
    //       centerOffsetX + (reelIdx * reelWidth) + (reelIdx * reelSpaceWidth),
    //       centerOffsetY + (rowIdx * reelRowHeight),
    //     ]
    //   ))
    // ))

    return positions
  }

  getPieceCenterCoords() {
    return [200, 200]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showErrorToast(errorMessage: any) {
    Logger.error(errorMessage)
  }
}

export default MainScene
