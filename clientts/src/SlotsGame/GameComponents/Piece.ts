import * as PIXI from 'pixi.js'
// import { GlowFilter } from '@pixi/filter-glow'
import { GlowFilter } from 'pixi-filters'
import { AssetKeys, getRandomPieceName } from '../Config/thingsToLoad'

// ================================================

const PIECE_GLOW_FILTER = new GlowFilter({
  distance: 15,
  outerStrength: 2,
  innerStrength: 1,
  color: 0xeab700,
  quality: 1, // 0 to 1
  // hideContents: false,
})

const FILTERS_WHEN_HIGHLIGHTED = [PIECE_GLOW_FILTER]

// ================================================

interface IPieceArgs {
  resources: PIXI.utils.Dict<PIXI.LoaderResource>
  x: number
  y: number
  size: number
  // textureName?: string
  glowing?: boolean
}

class Piece extends PIXI.Sprite {
  allTextures
  pieceType
  _renderWithGlow: boolean

  constructor({
    resources,
    // textureName,
    x,
    y,
    size,
    glowing = false,
  }: IPieceArgs) {
    // const pieceType = textureName || getRandomPieceName()
    const pieceType = getRandomPieceName()
    const texture = resources[pieceType].texture
    super(texture)

    this.allTextures = resources
    this.pieceType = pieceType
    this.position.set(x, y)
    this.width = size
    this.height = size
    this._renderWithGlow = glowing
  }

  updateTexture(newAssetKey: AssetKeys) {
    this.pieceType = newAssetKey
    const newTexture = this.allTextures[newAssetKey].texture
    if (newTexture) {
      this.texture = newTexture
    }
  }

  set isGlowing(isGlowing: boolean) {
    this._renderWithGlow = isGlowing
    this.filters = isGlowing ? FILTERS_WHEN_HIGHLIGHTED : []
  }
}

export default Piece
