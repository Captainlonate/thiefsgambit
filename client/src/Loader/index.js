class Loader {
  constructor ({ pixiLoader }) {
    this.pixiLoader = pixiLoader
  }

  preloadImages (imagesToLoad) {
    return new Promise((resolve, reject) => {
      this.pixiLoader.add(imagesToLoad)
      this.pixiLoader.load((loader, resources) => {
        resolve()
      })
    })
  }
}

export default Loader
