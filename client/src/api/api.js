import axios from "axios"

/*
  If all API requests use this wrapper, then we'll always have
  the same structure object, and same approach to error handling.
  That's what makes this a "normalized" response object.
*/
export const makeApiCall = async apiCall => {
  const normalizedResponseObj = { data: null, error: null, axiosResponse: null }
  try {
    const apiResponse = await apiCall()
    normalizedResponseObj.data = apiResponse.data
    normalizedResponseObj.axiosResponse = apiResponse
  } catch (apiError) {
    normalizedResponseObj.error = apiError?.response?.data || apiError.message
  }
  return normalizedResponseObj
}

export const gameApi = axios.create({
  baseURL: process.env.REACT_APP_URL_GAME
})

export const chatApi = axios.create({
  baseURL: process.env.REACT_APP_URL_SOCKETIO
})