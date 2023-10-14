import { AxiosError, AxiosResponse } from 'axios'
import { ERROR_CODES } from './ApiError'
import { ApiResponse } from './ApiResponse'
import { ServerResponse } from './ServerResponse'
import Logger from '../Logger'

type ApiCall<T> = () => Promise<AxiosResponse<ServerResponse<T>>>

/*
  If all API requests use this wrapper, then the response will always
  be the same structured object.
*/
export const makeApiCall = async <T>(apiCall: ApiCall<T>) => {
  const response = new ApiResponse<T>()

  try {
    // Make the api call
    const apiResponse = await apiCall()

    // Check if we recieved an expected/known server error.
    // In these cases there is likely an error code and a deliberately
    // constructed error message. We'll have a 200 status code for these.
    if (
      !apiResponse?.data ||
      !('success' in apiResponse.data) ||
      apiResponse.data?.success === false ||
      apiResponse.data?.error
    ) {
      response.setError(
        apiResponse?.data?.error?.error_code ?? ERROR_CODES.unknown,
        apiResponse?.data?.error?.human_msg ?? 'Unknown Error'
      )
    } else {
      response.data = apiResponse?.data?.data
    }
  } catch (apiError: unknown) {
    if (apiError instanceof AxiosError) {
      // If an exception is thrown, we probably got back a non-200
      // status code. Most likely this is an unexpected exception.
      response.setError(
        ERROR_CODES.non_200,
        apiError?.response?.data || apiError.message
      )
    } else if (apiError instanceof Error) {
      Logger.error('apiError', apiError)
      response.setError(ERROR_CODES.non_200, apiError.message)
    } else {
      Logger.error(
        "makeApiCall::apiError wasn't an AxiosError or Error",
        apiError
      )
      response.setError(ERROR_CODES.non_200, 'Unknown Error')
    }
  }

  return response
}
