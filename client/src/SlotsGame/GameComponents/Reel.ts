import * as PIXI from 'pixi.js'

interface ReelOptions {
  x?: number,
  y?: number
}

class Reel extends PIXI.Container {
  pieces: PIXI.Sprite[];

  constructor ({ x = 0, y = 0 }: ReelOptions) {
    super()

    this.position.set(x, y)
    this.pieces = []
  }

  addPiece (newSpritePiece: PIXI.Sprite) {
    this.pieces.push(newSpritePiece)
    this.addChild(newSpritePiece)
  }
}

export default Reel
