import * as PIXI from 'pixi.js'
import Loader from './Loader'
import { ImagesToLoad } from './Config/thingsToLoad'
import MainScene from './MainScene'
import FontFaceObserver from 'fontfaceobserver'
import Logger from './Logger'

/*

  Size & Coordinates & Responsiveness:
    The way I've made this responsive is as follows. I give the
    MainScene/Game Logic Code a width and height. These are logical
    units. As far as the MainScene knows, the game may as well be built
    for a single static resolution. Up here in App, when the browser resizes,
    I just scale the entire root stage. So, even though the game thinks it's
    working in a 1600 x 900 canvas, it might actually be rendered at some
    factor of that.
    Since the logical width and height will conform to some aspect ratio,
    then often there will be unused space vertically, or horizontally
    (like the horizontal black lines around a movie).
    So I center the MainScene between the black space.
*/
class App {
  pixiApp: PIXI.Application;
  logicalUnits: { width: number, height: number };
  loader: Loader;
  scene: MainScene | null = null;
  logger: Logger

  constructor (mountAt: HTMLElement) {
    this.logger = new Logger()

    this.pixiApp = new PIXI.Application({
      resizeTo: window,
      antialias: true,
      // It multiplies the <canvas> width and height * the window.devicePixelRatio.
      // Even though resizeTo is set, the <canvas> will be MORE than the window
      resolution: window.devicePixelRatio || 1,
      // This does not change the <canvas>'s width and height (like resolution does).
      // It changes the CSS's width and height to be (1 / window.devicePixelRatio) pixels
      autoDensity: true
    })

    // The logical units that the scene will use for drawing (will be scaled)
    this.logicalUnits = { width: 800, height: 450 }

    // view is a <canvas> DOM element
    mountAt.appendChild(this.pixiApp.view)

    // When the browser resizes, the stage container will be scaled
    window.addEventListener('resize', () => {
      this.handleWindowResize(window.innerWidth, window.innerHeight)
    })

    const pirateFont = new FontFaceObserver('pirate_font')

    // Handle loading in images (or sounds)
    this.loader = new Loader({ pixiLoader: this.pixiApp.loader })
    this.loader.preloadImages(ImagesToLoad).then(() => {
      // Game loads even if the font can't be loaded, as long
      // as it at least tried
      pirateFont.load().finally(() => this.setUpScene())
    })
  }

  setUpScene () {
    this.scene = new MainScene({
      pixiApp: this.pixiApp,
      logger: this.logger,
      sizes: {
        logicalWidth: this.logicalUnits.width,
        logicalHeight: this.logicalUnits.height
      }
    })
    this.pixiApp.stage.addChild(this.scene.container)
    // Initialize the size of the main scene
    this.handleWindowResize(window.innerWidth, window.innerHeight)
  }

  /*
    When the browser is resized, this is called.

    When the game tries to maintain it's aspect ratio (logicalAspect),
    it will try to be as big as possible. It will either fill the width
    or height of the screen, leaving black/unused space on the other side.
    By comparing the game's aspect ratio with the browser's (screenAspect),
    I can determine out which sides to max out (horizontal or vertical).
    Finally, by comparing the new, real, maxxed width/height with the logical one,
    I'll compute how much (...scaleFactor) to scale the logical size.
    I scale the logical size, by scaling the stage's container.
    The game's container (MainScene.container) uses the original logical sizes.
  */
  handleWindowResize (windowWidth: number, windowHeight: number) {
    if (!this.scene) {
      return
    }
    const screenAspect = windowWidth / windowHeight
    const logicalAspect = this.logicalUnits.width / this.logicalUnits.height

    if (logicalAspect >= screenAspect) {
      const widthScaleFactor = windowWidth / this.logicalUnits.width
      this.pixiApp.stage.scale.set(widthScaleFactor)
      // Positioning the container in the vertical middle
      const blackSpace = windowHeight - (windowWidth / logicalAspect)
      this.scene.container.x = 0
      this.scene.container.y = Math.floor(blackSpace / 2) / widthScaleFactor
    } else {
      const heightScaleFactor = windowHeight / this.logicalUnits.height
      this.pixiApp.stage.scale.set(heightScaleFactor)
      // Position the container in the horizontal middle
      const blackSpace = windowWidth - (windowHeight * logicalAspect)
      this.scene.container.x = Math.floor(blackSpace / 2) / heightScaleFactor
      this.scene.container.y = 0
    }
  }
}

export default App
