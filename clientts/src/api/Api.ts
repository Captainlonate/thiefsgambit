import { chatApi, gameApi } from './axios'
import { makeApiCall } from './makeApiCall'
import Logger from '../Logger'
import {
  ApiResponseIsLoggedIn,
  IApiResponseCurrentState,
  IApiResponseRecentChatsForRoom,
  IApiResponseRooms,
  IApiResponseSpin,
} from './ApiReturnDataTypes'
import { ApiResponse } from './ApiResponse'

/*
  To keep api code organized, every api call will have a method
  on this class, but the actual implementation code can be
  in other files.
*/
class GameAPI {
  constructor() {
    Logger.debug('Api::Created a new API object!')
  }

  async TryLogIn(email: string, password: string) {
    const apiResponse = await makeApiCall<ApiResponseIsLoggedIn>(() =>
      gameApi.post('/login', { email, password }, { withCredentials: true })
    )

    const logInVerdict = { errorMessageToDisplay: '', isAuthorized: false }

    if (apiResponse.isError) {
      logInVerdict.errorMessageToDisplay =
        apiResponse.errorMessage ?? 'Missing error message'
    } else {
      logInVerdict.isAuthorized = true
    }

    return logInVerdict
  }

  async Spin({ betMultiplier = 30 } = {}): Promise<
    ApiResponse<IApiResponseSpin>
  > {
    return await makeApiCall<IApiResponseSpin>(() =>
      gameApi.post('/spin', { bet: betMultiplier }, { withCredentials: true })
    )
  }

  async GetCurrentState(): Promise<ApiResponse<IApiResponseCurrentState>> {
    Logger.debug('Api::Trying to get initial state...')
    return await makeApiCall<IApiResponseCurrentState>(() =>
      gameApi.post('/currentstate', null, { withCredentials: true })
    )
  }

  async CheckIsLoggedIn(): Promise<ApiResponse<null>> {
    return await makeApiCall<ApiResponseIsLoggedIn>(() =>
      gameApi.get('/isloggedin', { withCredentials: true })
    )
  }

  async GetChatRooms(): Promise<ApiResponse<IApiResponseRooms>> {
    return await makeApiCall<IApiResponseRooms>(() =>
      chatApi.get('/chats/room', { withCredentials: true })
    )
  }

  async GetRecentChatsForOneRoom(
    roomId: string
  ): Promise<ApiResponse<IApiResponseRecentChatsForRoom>> {
    const apiResponse = await makeApiCall<IApiResponseRecentChatsForRoom>(() =>
      chatApi.get(`/chats/room/${roomId}`, { withCredentials: true })
    )

    return apiResponse
  }
}

Logger.debug('gameApi.js::Running the code in global context')

export const API = new GameAPI()
