import { ApiError, matchStringToErrorCode } from './ApiError'

/**
 * Custom & normalized API response that the client side will create
 * based on the actual server response.
 */
export class ApiResponse<T> {
  #_data: T | null
  #_apiError: ApiError | null

  constructor() {
    this.#_data = null
    this.#_apiError = null
  }

  // ===================
  // ===== Getters =====
  // ===================

  get isError(): boolean {
    return this.#_apiError instanceof ApiError
  }

  get errorMessage() {
    return this.isError ? this.#_apiError?.message : ''
  }

  get errorCode() {
    return this.isError ? this.#_apiError?.errorCode : ''
  }

  get data() {
    return this.#_data
  }

  // ===================
  // ===== Setters =====
  // ===================

  setError(errorCodeStr: string, message: string) {
    this.#_data = null
    this.#_apiError = new ApiError(
      message,
      matchStringToErrorCode(errorCodeStr)
    )
  }

  set data(newData: T | null) {
    this.#_apiError = null
    this.#_data = newData
  }

  // Static method to check if something IS an ApiResponse
  static is(anything: unknown): boolean {
    try {
      return anything instanceof ApiResponse
    } catch (ex) {
      return false
    }
  }
}
