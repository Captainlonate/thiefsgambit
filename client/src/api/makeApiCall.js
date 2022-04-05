import { ERROR_CODES } from "./ApiError"
import { ApiResponse } from "./ApiResponse"

/*
  If all API requests use this wrapper, then the response will always
  be the same structured object.
*/
export const makeApiCall = async apiCall => {
  const response = new ApiResponse()

  try {
    // Make the api call
    const apiResponse = await apiCall()
    // Store the axios response object, for later debugging
    response.axios = apiResponse
    // Check if we recieved an expected/known server error.
    // In these cases there is likely an error code and a deliberately
    // constructed error message. We'll have a 200 status code for these.
    if (apiResponse?.data?.success === false || apiResponse?.data?.error) {
      response.setError({
        errorCode: apiResponse?.data?.error?.error_code,
        message: apiResponse?.data?.error?.human_msg
      })
    } else {
      response.data = apiResponse?.data?.data
    }
  } catch (apiError) {
    // If an exception is thrown, we probably got back a non-200
    // status code. Most likely this is an unexpected exception.
    response.setError({
      errorCode: ERROR_CODES.non_200,
      message: apiError?.response?.data || apiError.message
    })
  }

  return response
}