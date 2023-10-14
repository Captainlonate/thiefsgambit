import * as PIXI from 'pixi.js'
import Piece from './Piece'

class Reel extends PIXI.Container {
  pieces: Piece[]

  constructor({ x = 0, y = 0 }) {
    super()

    this.position.set(x, y)
    this.pieces = []
  }

  addPiece(newSpritePiece: Piece) {
    this.pieces.push(newSpritePiece)
    this.addChild(newSpritePiece)
  }
}

export default Reel
