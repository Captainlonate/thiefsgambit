/*
  After making a network request, if the server wants to
  communicate that something was not successful, that response
  should be translated into this ApiError object, client side.

  There should be a lookup table for all possible `error_code`s,
  and calling code should also be able to use:
    if (ApiError.is(resultOfCallingApi)) {

    }
  to check if everything was "ok" or not.
*/
export class ApiError extends Error {
  constructor ({ message, errorCode }) {
    super(message)
    this.name = this.constructor.name;
    this.message = message
    this.errorCode = errorCode
  }
}

export const ERROR_CODES = {
  //
  // Set by the API
  //
  item_already_exists: "item_already_exists",
  error_inserting_item: "error_inserting_item",
  bad_content_type: "bad_content_type",
  empty_post_body: "empty_post_body",
  missing_credentials: "missing_credentials",
  invalid_formdata: "invalid_formdata",
  internal_server: "internal_server",
  not_logged_in: "not_logged_in",
  bad_token: "bad_token",
  username_in_use: "username_in_use",
  email_in_use: "email_in_use",
  wrong_email: "wrong_email",
  wrong_password: "wrong_password",
  invalid_bet_amount: "invalid_bet_amount",
  no_id_in_token: "no_id_in_token",
  insufficient_coins: "insufficient_coins",
  //
  // Custom Client Side Interpretations
  //
  non_200: "non_200"
}
