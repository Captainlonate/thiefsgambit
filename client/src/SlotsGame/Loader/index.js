class Loader {
  pixiLoader;

  constructor ({ pixiLoader }) {
    this.pixiLoader = pixiLoader
  }

  preloadImages (imagesToLoad) {
    return new Promise((resolve) => {
      this.pixiLoader.add(imagesToLoad)
      this.pixiLoader.load(() => {
        resolve()
      })
    })
  }
}

export default Loader
