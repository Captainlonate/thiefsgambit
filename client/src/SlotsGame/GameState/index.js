import { formatCommas } from '../../utils'

class GameState {
  total = 0;
  bet = 0;
  lastWinnings = 0;
  canSpin = false;

  constructor () {
    this.total = 0
    this.bet = 0
    this.lastWinnings = 0

    this.canSpin = false
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
}

export default GameState
