import * as PIXI from 'pixi.js'
import { GlowFilter } from  "@pixi/filter-glow"
import { arrayIsNotEmpty } from '../../utils';

// ==================================================

/*
  For use with: this.lineStyle(PAYLINE_LINESTYLE)
*/
const PAYLINE_LINESTYLE = {
  width: 5,
  cap: PIXI.LINE_CAP.ROUND,
  color: 0xe8c101,
  alpha: 0.9, // 0 hidden, to, 1 no transparency
}

/*
  Uses: @pixi/filter-glow
*/
const LINE_GLOW_FILTER = new GlowFilter({
  distance: 9,
  outerStrength: 2,
  innerStrength: 1,
  color: 0xe8c101,
  quality: 0.75, // 0 to 1
  hideContents: false,
});

/*
  For use with: this.filters = LINE_FILTERS
*/
const LINE_FILTERS = [LINE_GLOW_FILTER]

// ==================================================

class PaylineGraphic extends PIXI.Graphics {
  constructor () {
    super()
    // Make the lines glow
    this.filters = LINE_FILTERS
  }

  /*
    Erases the lines and resets the lineStyles since clear()
    will also erase lineStyle.
  */
  clearPayline () {
    this.clear().lineStyle(PAYLINE_LINESTYLE);
  }

  /*
    newVertices = [{ x: 11, y: 12 }, ...]
  */
  redrawLineSegments (newVertices) {
    this.clearPayline()

    if (arrayIsNotEmpty(newVertices)) {
      newVertices.forEach(({ x, y }, idx) => {
        if (idx === 0) {
          this.moveTo(x, y);    
        } else {
          this.lineTo(x, y);
        }
      })
      this.endFill();
      this.closePath();
    }
  }
}

export default PaylineGraphic