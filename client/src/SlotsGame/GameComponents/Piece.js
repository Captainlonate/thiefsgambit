import * as PIXI from 'pixi.js'
import { GlowFilter } from  "@pixi/filter-glow"
import { getRandomPieceName } from '../Config/thingsToLoad'

// ================================================

const PIECE_GLOW_FILTER = new GlowFilter({
  distance: 15,
  outerStrength: 2,
  innerStrength: 1,
  color: 0xeab700,
  quality: 0.5, // 0 to 1
  hideContents: false
})

const FILTERS_WHEN_HIGHLIGHTED = [PIECE_GLOW_FILTER]

// ================================================

class Piece extends PIXI.Sprite {
  allTextures;
  pieceType;
  _renderWithGlow;

  constructor ({ resources, textureName, x = 0, y = 0, size = 100, glowing = false }) {
    const pieceType = textureName || getRandomPieceName()
    const texture = resources[pieceType].texture
    super(texture)

    this.allTextures = resources
    this.pieceType = pieceType
    this.position.set(x, y)
    this.width = size
    this.height = size
    this._renderWithGlow = glowing
  }

  updateTexture (newAssetKey) {
    this.pieceType = newAssetKey
    const newTexture = this.allTextures[newAssetKey].texture
    if (newTexture) {
      this.texture = newTexture
    }
  }

  set isGlowing (isGlowing) {
    this._renderWithGlow = isGlowing
    this.filters = isGlowing ? FILTERS_WHEN_HIGHLIGHTED : []
  }
}

export default Piece
