import CompassImg from '../images/compass_1k.png'
import AnchorImg from '../images/anchor_1k.png'
import TreasureMapImg from '../images/treasure_map_1k.png'
import HelmImg from '../images/helm_1k.png'
import SceneImg from '../images/scene_3d.png'
import PirateFont from '../fonts/pirate_font.ttf'
import { LoadAddOption, StringObject, PIXIResource } from '../types/types'

export const ImagesToLoad: LoadAddOption[] = [
  { name: 'compass', url: CompassImg },
  { name: 'anchor', url: AnchorImg },
  { name: 'treasureMap', url: TreasureMapImg },
  { name: 'helm', url: HelmImg },
  { name: 'scene', url: SceneImg },
  { name: 'pirate_font', url: PirateFont }
]

/*
  Translates the terms that the server uses to refer
  to each slot piece type, to the terms used within
  this client application
*/
const serverKeyToAssetKey: StringObject = {
  map: 'treasureMap',
  compass: 'compass',
  anchor: 'anchor'
}

/*
  returns a randomly select slot piece's name/key/label
*/
export const getRandomPieceName = (): string => {
  const options = ['compass', 'anchor', 'treasureMap']
  return options[Math.floor(Math.random() * options.length)]
}

/*
  Randomly selects one of the slot's pieces textures
    resources: a pixi.loader.resources object
*/
export const getRandomPieceTexture = (resources: PIXIResource) => {
  return resources[getRandomPieceName()].texture
}

/*
  Translates a server's naming scheme for a specific image to
    one local to this application
  resources: a pixi.loader.resources object
  serverKey: How the server refers to a specific piece image
    (May or may not be the same as the name I gave it above)
*/
export const getTextureByServerKey = (resources: PIXIResource, serverKey: string) => {
  const assetKey = serverKeyToAssetKey[serverKey]
  return assetKey ? resources[assetKey].texture : undefined
}
