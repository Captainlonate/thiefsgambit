import * as PIXI from 'pixi.js'
import { getRandomPieceName } from '../Config/thingsToLoad'

class Piece extends PIXI.Sprite {
  allTextures;
  pieceType;

  constructor ({ resources, textureName, x = 0, y = 0, size = 100 }) {
    const pieceType = textureName || getRandomPieceName()
    const texture = resources[pieceType].texture
    super(texture)

    this.allTextures = resources
    this.pieceType = pieceType
    this.position.set(x, y)
    this.width = size
    this.height = size
  }

  updateTexture (newAssetKey) {
    this.pieceType = newAssetKey
    const newTexture = this.allTextures[newAssetKey].texture
    if (newTexture) {
      this.texture = newTexture
    }
  }
}

export default Piece
