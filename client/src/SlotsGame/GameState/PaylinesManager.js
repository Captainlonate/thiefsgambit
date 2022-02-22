import PaylineGraphic from '../GameComponents/PaylineGraphic'
import { arrayIsNotEmpty } from '../../utils'

class PaylinesManager {
  _allPaylines; // []
  _allCoordinates; // []
  _currentlyShownIdx; // 0
  lineGraphic; // PIXI.Graphics
  count; // 0

  // ============================================

  constructor () {
    // The PIXI Graphic that draws the line(s)
    this.lineGraphic = new PaylineGraphic()
    // Set the initial default values
    this.clearPaylines()
  }

  // ============================================

  get hasPaylines () {
    return this.count > 0
  }

  get currentPayline () {
    return (this.hasPaylines)
      ? this._allPaylines[this._currentlyShownIdx]
      : []
  }

  get currentPaylineCoordinates () {
    return (this.hasPaylines)
      ? this._allCoordinates[this._currentlyShownIdx]
      : []
  }

  // ============================================

  updatePaylines ({ rowIndices = [], coordinates = [] } = {}) {
    const haveValidPaylineData = (
      arrayIsNotEmpty(rowIndices) &&
      arrayIsNotEmpty(coordinates) &&
      rowIndices.length === coordinates.length
    )

    if (haveValidPaylineData) {
      this._allPaylines = rowIndices
      this._allCoordinates = coordinates
      this._currentlyShownIdx = 0
      this.count = this._allPaylines.length
      this.lineGraphic.redrawLineSegments(this.currentPaylineCoordinates)
    } else {
      this.clearPaylines()
    }
  }

  clearPaylines () {
    this._allPaylines = []
    this._allCoordinates = []
    this._currentlyShownIdx = 0
    this.count = 0
    if (this.lineGraphic) {
      this.lineGraphic.clearPayline()
    }
  }

  nextPayline () {
    if (this.count > 1) {
      this._currentlyShownIdx = (this._currentlyShownIdx + 1 >= this.count)
        ? 0
        : this._currentlyShownIdx + 1

      this.lineGraphic.redrawLineSegments(this.currentPaylineCoordinates)
    }
  }
}

export default PaylinesManager