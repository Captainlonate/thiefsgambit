package routes

import (
	ce "slotsserver/customError"
)

/*
	All API endpoints should return this exact
	structure with a 200 HTTP status code.
	Success will be false if something didn't go
		according to plan.
	Error can be a normal error, but should almost
		always be an ApiError struct. This should only
		be populated when success is false.
	Data will generally only be populated if success
		was true.
*/
type ApiResponse struct {
	Success bool        `json:"success"`
	Error   error       `json:"error"`
	Data    interface{} `json:"data"`
}

/*
	Convenience function for creating an ApiResponse
	object that is a failure (which can require multiple
	lines of code). Since it's so common, this will
	make it simpler.
*/
func MakeFailure(code ce.ErrorCode, message string) ApiResponse {
	return ApiResponse{
		Success: false,
		Error: &ce.ApiError{
			Code:            code,
			FriendlyMessage: message,
		},
	}
}

/*
	Convenience function for creating an ApiResponse
	object that is a failure and has an error object
	to include. (which can require multiple lines of code).
	Since it's so common, this will make it simpler.
*/
func MakeFailureWithError(code ce.ErrorCode, message string, err error) ApiResponse {
	return ApiResponse{
		Success: false,
		Error: &ce.ApiError{
			Code:            code,
			FriendlyMessage: message,
			Err:             err,
		},
	}
}
