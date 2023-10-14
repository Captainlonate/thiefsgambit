import * as PIXI from 'pixi.js'

class Loader {
  pixiLoader: PIXI.Loader

  constructor({ pixiLoader }: { pixiLoader: PIXI.Loader }) {
    this.pixiLoader = pixiLoader
  }

  preloadImages(imagesToLoad: PIXI.IAddOptions[]) {
    return new Promise<void>((resolve) => {
      this.pixiLoader.add(imagesToLoad)
      this.pixiLoader.load(() => {
        resolve()
      })
    })
  }
}

export default Loader
