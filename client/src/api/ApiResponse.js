import { ApiError } from "./ApiError"

export class ApiResponse {
  constructor () {
    this._data = null
    this._apiError = null
    this.axios = null
  }

  // ===================
  // ===== Getters =====
  // ===================

  get isError () {
    return (this._apiError instanceof ApiError)
  }

  get errorMessage () {
    return (this.isError) ? this?._apiError?.message : ""
  }

  get errorCode () {
    return (this.isError) ? this?._apiError?.error_code : ""
  }

  get data () {
    return this._data
  }

  // ===================
  // ===== Setters =====
  // ===================

  setError ({ errorCode, message } = {}) {
    if (message) {
      this._apiError = new ApiError({ message, errorCode })
    }
  }

  set data (newData) {
    this._apiError = null
    this._data = newData
  }
}

// Static method to check if something IS an ApiResponse
ApiResponse.is = function (anything) {
  try {
    return (anything instanceof ApiResponse)
  } catch (ex) {
    return false
  }
}
