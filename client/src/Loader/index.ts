import * as PIXI from 'pixi.js'
import { LoadAddOption } from '../types/types'

interface LoaderOptions {
  pixiLoader: PIXI.Loader;
}

class Loader {
  pixiLoader: PIXI.Loader;

  constructor ({ pixiLoader }: LoaderOptions) {
    this.pixiLoader = pixiLoader
  }

  preloadImages (imagesToLoad: LoadAddOption[]) {
    return new Promise<void>((resolve) => {
      this.pixiLoader.add(imagesToLoad)
      this.pixiLoader.load(() => {
        resolve()
      })
    })
  }
}

export default Loader
