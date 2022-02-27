import Logger from "../Logger"

export class Api {
  constructor () {
    Logger.debug("Api::Created a new API!")
  }

  async TryLogIn ({ email, password }) {
    Logger.debug("Trying to log in...")
  }

  async getSpin () {

  }

  async getInitialState () {

  }
}

Logger.debug("gameApi.js::Running the code in global context")

const GameApi = new Api()

export default GameApi