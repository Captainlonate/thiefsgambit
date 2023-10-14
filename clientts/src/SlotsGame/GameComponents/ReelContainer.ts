import * as PIXI from 'pixi.js'

interface IReelContainerArgs {
  /**
   * x and y position
   */
  x: number
  y: number
  /**
   * Dimensions of the background color and mask
   */
  displayWidth: number
  displayHeight: number
  /**
   * Solid color of the background, or empty if no bg
   */
  bgColor?: number
}

class ReelContainer extends PIXI.Container {
  displayWidth: number
  displayHeight: number
  bgSprite: PIXI.Sprite | null = null
  maskGraphic: PIXI.Graphics

  constructor({
    x,
    y,
    displayWidth,
    displayHeight,
    bgColor,
  }: IReelContainerArgs) {
    super()
    this.position.set(x, y)
    this.displayWidth = displayWidth
    this.displayHeight = displayHeight

    // Background Color
    if (bgColor) {
      this.bgSprite = this.createBg(bgColor)
      this.addChild(this.bgSprite)
    }

    // Mask
    this.maskGraphic = this.createMask()
    this.addChild(this.maskGraphic)
    this.mask = this.maskGraphic
  }

  createMask(): PIXI.Graphics {
    const maskGraphic = new PIXI.Graphics()
    maskGraphic.beginFill(0xffffff)
    maskGraphic.drawRect(0, 0, this.displayWidth, this.displayHeight)
    maskGraphic.endFill()
    return maskGraphic
  }

  createBg(bgColor: number): PIXI.Sprite {
    const bgSprite = new PIXI.Sprite(PIXI.Texture.WHITE)
    bgSprite.tint = bgColor
    bgSprite.width = this.displayWidth
    bgSprite.height = this.displayHeight
    return bgSprite
  }
}

export default ReelContainer
