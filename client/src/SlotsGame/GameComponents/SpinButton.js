import * as PIXI from 'pixi.js'

class SpinButton extends PIXI.Sprite {
  constructor (config) {
    const {
      texture,
      size = 100,
      clickFn,
      position: { x = 0, y = 0 } = {}
    } = config
    super(texture || PIXI.Texture.WHITE)
    this.buttonMode = true
    this.interactive = true
    this.width = size
    this.height = size
    this.position.set(x, y)

    if (clickFn) {
      this.addListener('pointerup', clickFn)
    }
  }

  get size () {
    return this.width
  }

  set size (dimensions) {
    this.width = dimensions
    this.height = dimensions
  }
}

export default SpinButton
