import * as PIXI from 'pixi.js'

class ReelContainer extends PIXI.Container {
  constructor ({
    // x and y position
    x = 0,
    y = 0,
    // Dimensions of the background color and mask
    displayWidth = 0,
    displayHeight = 0,
    // Solid color of the background, or empty if no bg
    bgColor = null
  }) {
    super()
    this.position.set(x, y)
    this.displayWidth = displayWidth
    this.displayHeight = displayHeight
    this.bgColor = bgColor

    // Background Color
    if (bgColor) {
      this.bgSprite = this.createBg()
      this.addChild(this.bgSprite)
    }

    // Mask
    this.maskGraphic = this.createMask()
    this.addChild(this.maskGraphic)
    this.mask = this.maskGraphic
  }

  createMask () {
    const maskGraphic = new PIXI.Graphics()
    maskGraphic.beginFill(0xffffff)
    maskGraphic.drawRect(0, 0, this.displayWidth, this.displayHeight)
    maskGraphic.endFill()
    return maskGraphic
  }

  createBg () {
    const bgSprite = new PIXI.Sprite(PIXI.Texture.WHITE)
    bgSprite.tint = this.bgColor
    bgSprite.width = this.displayWidth
    bgSprite.height = this.displayHeight
    return bgSprite
  }
}

export default ReelContainer
