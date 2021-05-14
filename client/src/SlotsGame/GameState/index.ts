import { formatCommas } from '../../utils'

class GameState {
  total: number;
  bet: number;
  lastWinnings: number;
  canSpin: boolean;

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
