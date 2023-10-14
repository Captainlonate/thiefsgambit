import * as PIXI from 'pixi.js'

import CompassImg from '../images/compass_1k.png'
import AnchorImg from '../images/anchor_1k.png'
import TreasureMapImg from '../images/treasure_map_1k.png'
import HelmImg from '../images/helm_1k.png'
import SceneImg from '../images/scene_3d.png'
import FrameImg from '../images/picture_frame_3d.png'
import MissingTextureImg from '../images/missing_texture_1k.png'
import PirateFont from '../../fonts/pirate_font.ttf'

export const ImagesToLoad: PIXI.IAddOptions[] = [
  { name: 'compass', url: CompassImg },
  { name: 'anchor', url: AnchorImg },
  { name: 'treasureMap', url: TreasureMapImg },
  { name: 'helm', url: HelmImg },
  { name: 'scene', url: SceneImg },
  { name: 'frame', url: FrameImg },
  { name: 'pirate_font', url: PirateFont },
  { name: 'missing_texture', url: MissingTextureImg },
]

type ServerKeys = 'map' | 'compass' | 'anchor' | 'frame'
export type AssetKeys = 'treasureMap' | 'compass' | 'anchor' | 'frame'

/*
  Translates the terms that the server uses to refer
  to each slot piece type, to the terms used within
  this client application
*/
const serverKeyToAssetKey: {
  [key in ServerKeys]: AssetKeys
} = {
  map: 'treasureMap',
  compass: 'compass',
  anchor: 'anchor',
  frame: 'frame',
} as const

function isValidServerKey(key: string): key is ServerKeys {
  return Object.prototype.hasOwnProperty.call(serverKeyToAssetKey, key)
}

const possiblePieceNames = [
  'compass',
  'anchor',
  'treasureMap',
  'frame',
] as const

/**
 * returns a randomly select slot piece's name/key/label
 */
export const getRandomPieceName = (): AssetKeys => {
  return possiblePieceNames[
    Math.floor(Math.random() * possiblePieceNames.length)
  ]
}

/*
  Translates a server's naming scheme for a specific image to
    one local to this application
  resources: a pixi.loader.resources object
  serverKey: How the server refers to a specific piece image
    (May or may not be the same as the name I gave it above)
*/
export const getTextureByServerKey = (
  resources: PIXI.utils.Dict<PIXI.LoaderResource>,
  serverKey: string
) => {
  return isValidServerKey(serverKey) &&
    resources[serverKeyToAssetKey[serverKey]]
    ? resources[serverKeyToAssetKey[serverKey]].texture
    : resources['missing_texture'].texture
}
