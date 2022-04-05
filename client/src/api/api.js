import { gameApi } from "./axios"
import { makeApiCall } from "./makeApiCall"
import Logger from "../Logger"

/*
  To keep api code organized, every api call will have a method
  on this class, but the actual implementation code can be
  in other files.
*/
class GameAPI {
  constructor () {
    Logger.debug("Api::Created a new API object!")
  }

  async TryLogIn ({ email = "", password = "" } = {}) {
    const apiResponse = await makeApiCall(() => 
      gameApi.post('/login', { email, password }, { withCredentials: true })
    )

    const verdict = { errorMessageToDisplay: "", isAuthorized: false }

    if (apiResponse.isError) {
      verdict.errorMessageToDisplay = apiResponse.errorMessage
    } else {
      verdict.isAuthorized = true
    }

    return verdict
  }

  async Spin ({ betMultiplier = 30 } = {}) {
    return await makeApiCall(() => 
      gameApi.post('/spin', { bet: betMultiplier }, { withCredentials: true })
    )
  }

  async getCurrentState () {
    Logger.debug("Api::Trying to get initial state...")
    return await makeApiCall(() => 
      gameApi.post('/currentstate', null, { withCredentials: true })
    )
  }
}

Logger.debug("gameApi.js::Running the code in global context")

export const API = new GameAPI()