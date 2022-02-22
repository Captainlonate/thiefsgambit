import { arrayIsNotEmpty } from '../../utils'

class PaylinesManager {
  all;
  currentlyShownIdx;
  currentlyShown;
  count;

  constructor () {
    this.setPaylines({ paylines: [] })
  }

  get hasPaylines () {
    return this.count > 0
  }

  setPaylines ({ paylines }) {
    if (arrayIsNotEmpty(paylines)) {
      this.all = paylines
      this.currentlyShownIdx = 0
      this.currentlyShown = paylines[this.currentlyShownIdx]
      this.count = paylines.length
    } else {
      this.clearPaylines()
    }
  }

  clearPaylines () {
    this.all = []
    this.currentlyShownIdx = 0
    this.currentlyShown = []
    this.count = 0
  }

  nextPayline () {
    if (this.count > 1) {
      this.currentlyShownIdx = (this.currentlyShownIdx + 1 >= this.count)
        ? 0
        : this.currentlyShownIdx + 1

      this.currentlyShown = this.all[this.currentlyShownIdx]
    }
  }
}

export default PaylinesManager