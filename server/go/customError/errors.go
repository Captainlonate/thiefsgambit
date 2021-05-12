package customError

import "fmt"

type ErrorCode = string

const InsertUniqueErrorCode ErrorCode = "item_already_exists"
const InsertErrorCode ErrorCode = "error_inserting_item"
const BadContentTypeErrorCode ErrorCode = "bad_content_type"
const EmptyPostBodyErrorCode ErrorCode = "empty_post_body"
const MissingCredentialsErrorCode ErrorCode = "missing_credentials"
const InvalidFormDataErrorCode ErrorCode = "invalid_formdata"
const InternalServerErrorCode ErrorCode = "internal_server"
const NotLoggedInErrorCode ErrorCode = "not_logged_in"
const BadJWTErrorCode ErrorCode = "bad_token"
const EmailInUseErrorCode ErrorCode = "email_in_use"
const WrongEmailErrorCode ErrorCode = "wrong_email"
const WrongPasswordErrorCode ErrorCode = "wrong_password"

type ApiError struct {
	Code            ErrorCode `json:"error_code"`
	FriendlyMessage string    `json:"human_msg"`
	Err             error
}

// All errors must implement this function
// for the interface
func (r *ApiError) Error() string {
	return fmt.Sprintf("error_code %s: err %v", r.Code, r.Err)
}
