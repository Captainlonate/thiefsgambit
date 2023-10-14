interface ServerError {
  error_code: string
  human_msg: string
}

/**
 * All Golang API responses will have this structure.
 * But it needs to be processed into a client-side friendly
 * format, which is `ApiResponse`.
 */
export interface ServerResponse<T> {
  success: boolean
  error: null | ServerError
  data: T | null
}
