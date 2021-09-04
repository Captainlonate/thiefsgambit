/*
  Convenience method for creating an API Response that
  contains a failure.
*/
exports.makeFailedResponse = (errorCode, message, err = null) => ({
  success: false,
  error: {
    error_code: errorCode,
    human_msg: message,
    err
  },
  data: null
})

exports.makeSuccessResponse = (data) => ({
  success: true,
  error: null,
  data
})
