import * as PIXI from 'pixi.js'
import { arrayIsNotEmpty } from '../../utils';

class Payline extends PIXI.Graphics {
  // constructor () {
  //   super()
  // }

  clearPayline () {
    this.clear()
  }

  updatePayline (newVertices) {
    this.clearPayline()

    if (arrayIsNotEmpty(newVertices)) {
      this.lineStyle(5, 0xffffff);
      newVertices.forEach(([x, y], idx) => {
        if (idx === 0) {
          this.moveTo(x, y);    
        } else {
          this.lineTo(x, y);
        }
      })
      this.endFill();
    }
  }
}

export default Payline