import * as PIXI from 'pixi.js'

class Reel extends PIXI.Container {
  pieces;

  constructor ({ x = 0, y = 0 }) {
    super()

    this.position.set(x, y)
    this.pieces = []
  }

  addPiece (newSpritePiece) {
    this.pieces.push(newSpritePiece)
    this.addChild(newSpritePiece)
  }
}

export default Reel
