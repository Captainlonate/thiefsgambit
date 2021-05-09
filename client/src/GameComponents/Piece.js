import * as PIXI from 'pixi.js'
import { getRandomPieceName } from '../Config/thingsToLoad'

class Piece extends PIXI.Sprite {
  constructor ({ allTextures, textureName, x = 0, y = 0, size = 100 }) {
    const pieceType = textureName || getRandomPieceName()
    const texture = allTextures[pieceType].texture
    super(texture)

    this.allTextures = allTextures
    this.pieceType = pieceType
    this.position.set(x, y)
    this.width = size
    this.height = size
  }

  updateTexture (newPieceType) {
    this.pieceType = newPieceType
    this.texture = this.allTextures[newPieceType].texture
  }
}

export default Piece
