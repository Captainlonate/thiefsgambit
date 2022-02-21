import { formatCommas } from '../../utils'
import { GAME_MODES } from './GameModes'
import Paylines from './Paylines';

class GameState {
  total = 0;
  bet = 0;
  lastWinnings = 0;
  canSpin = false;
  // mode = GAME_MODES.LOADING;
  spinning = false;

  constructor () {
    this.total = 0
    this.bet = 0
    this.lastWinnings = 0

    this.canSpin = false
    this.spinning = false

    this.paylines = new Paylines()
  }

  get totalText () {
    return formatCommas(this.total)
  }

  get betText () {
    return this.bet.toString()
  }

  get winningsText () {
    return formatCommas(this.lastWinnings)
  }

  setGameMode (newGameMode) {
    switch (newGameMode) {
      case GAME_MODES.LOADING:
        this.canSpin = false
        this.spinning = false
        break;
      case GAME_MODES.READY:
        this.canSpin = true
        this.spinning = false
        break;
      case GAME_MODES.SPINNING:
        this.canSpin = false
        this.spinning = true
        break;
      case GAME_MODES.SHOWING_PAYLINES:
        this.canSpin = true
        this.spinning = false
        break;
      case GAME_MODES.ERROR:
        this.canSpin = false
        this.spinning = false
        break;
      default:
    }
  }
}

export default GameState
