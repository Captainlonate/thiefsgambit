import { formatCommas } from '../../utils'
import { GAME_MODES } from './GameModes'
import PaylinesManager from './PaylinesManager'

class GameState {
  total: number
  bet: number
  lastWinnings: number
  canSpin: boolean
  spinning: boolean
  paylines: PaylinesManager

  constructor() {
    this.total = 0
    this.bet = 0
    this.lastWinnings = 0

    this.canSpin = false
    this.spinning = false

    this.paylines = new PaylinesManager()
  }

  get totalText() {
    return formatCommas(this.total)
  }

  get betText() {
    return this.bet.toString()
  }

  get winningsText() {
    return formatCommas(this.lastWinnings)
  }

  setGameMode(newGameMode: GAME_MODES) {
    switch (newGameMode) {
      case GAME_MODES.LOADING:
        this.canSpin = false
        this.spinning = false
        break
      case GAME_MODES.READY:
        this.canSpin = true
        this.spinning = false
        break
      case GAME_MODES.SPINNING:
        this.canSpin = false
        this.spinning = true
        break
      case GAME_MODES.SHOWING_PAYLINES:
        this.canSpin = true
        this.spinning = false
        break
      case GAME_MODES.ERROR:
        this.canSpin = false
        this.spinning = false
        break
      default:
    }
  }
}

export default GameState
