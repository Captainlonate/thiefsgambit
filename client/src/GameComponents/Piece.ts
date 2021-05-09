import * as PIXI from 'pixi.js'
import { getRandomPieceName } from '../Config/thingsToLoad'
import { PIXIResource } from '../types/types'

interface PieceOptions {
  resources: PIXIResource,
  textureName?: string,
  x?: number,
  y?: number,
  size?: number
}

class Piece extends PIXI.Sprite {
  allTextures: PIXIResource;
  pieceType: string;

  constructor ({ resources, textureName, x = 0, y = 0, size = 100 }: PieceOptions) {
    const pieceType = textureName || getRandomPieceName()
    const texture = resources[pieceType].texture
    super(texture)

    this.allTextures = resources
    this.pieceType = pieceType
    this.position.set(x, y)
    this.width = size
    this.height = size
  }

  updateTexture (newAssetKey: string) {
    this.pieceType = newAssetKey
    const newTexture = this.allTextures[newAssetKey].texture
    if (newTexture) {
      this.texture = newTexture
    }
  }
}

export default Piece
