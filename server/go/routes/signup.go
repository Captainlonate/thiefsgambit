package routes

import (
	"fmt"
	"strings"

	ce "slotsserver/customError"
	db "slotsserver/database"

	"github.com/gofiber/fiber/v2"
)

// ========================================================

type SignUpInputModel struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// ========================================================

func (model *SignUpInputModel) TrimFields() {
	model.Username = strings.TrimSpace(model.Username)
	model.Email = strings.TrimSpace(model.Email)
	model.Password = strings.TrimSpace(model.Password)
}

/*
	The fiber route for handling when new users try
	to sign up (and create a new account).
	Expects a SignUpInputModel to have been POST'ed
	in the body
*/
func HandleSignup(c *fiber.Ctx) error {
	// Anyone who is trying to sign up, shouldn't have
	// a JWT token. If they do, get rid of it.
	ExpireJWTCookie(c)

	// Parse the input the user sent
	signupCredentials := new(SignUpInputModel)
	if err := ParsePostBodyOrError(c, &signupCredentials); err != nil {
		return c.JSON(err)
	}

	fmt.Printf("Passed in signup credentials:\n\t%+v\n", signupCredentials)

	signupCredentials.TrimFields()

	// Make sure the form data is valid
	validationErrors := ValidateSignupStruct(signupCredentials)
	if len(validationErrors) > 0 {
		fmt.Printf("HandleSignup error: Credentials are wrong or missing. %+v \n", signupCredentials)
		return c.JSON(MakeFailure(
			ce.InvalidFormDataErrorCode,
			strings.Join(validationErrors, ";;"),
		))
	}

	// Has the email already been taken
	isTaken, queryError := db.IsEmailInUse(signupCredentials.Email)
	if queryError != nil {
		return c.JSON(MakeFailure(
			ce.InternalServerErrorCode,
			"Server error. Could not query for email.",
		))
	}

	if isTaken {
		return c.JSON(MakeFailure(
			ce.EmailInUseErrorCode,
			fmt.Sprintf("The email %s is already in use.", signupCredentials.Email),
		))
	}

	// Has the username already been taken
	usernameIsTaken, queryError := db.IsUsernameInUse(signupCredentials.Username)
	if queryError != nil {
		return c.JSON(MakeFailure(
			ce.InternalServerErrorCode,
			"Server error. Could not query for username.",
		))
	}

	if usernameIsTaken {
		return c.JSON(MakeFailure(
			ce.UsernameInUseErrorCode,
			fmt.Sprintf("The username %s is already in use.", signupCredentials.Username),
		))
	}

	// Create new user
	userToAdd := db.User{
		Username:       signupCredentials.Username,
		Email:          signupCredentials.Email,
		HashedPassword: db.HashAndSaltPassword(signupCredentials.Password),
		SlotsData: db.SlotsData{
			FreeSpins: 0,
			Coins:     2400,
		},
	}

	// Insert the user in the database
	if apiErr := db.InsertNewUser(&userToAdd); apiErr != nil {
		return c.JSON(ApiResponse{Success: false, Error: apiErr})
	}

	fmt.Printf("New User Created:\n\t%+v\n", userToAdd)

	return c.JSON(ApiResponse{Success: true})
}

/*

 */
func ValidateSignupStruct(signupModel *SignUpInputModel) []string {
	errors := []string{}

	// First name
	if !ValidateStringLength(signupModel.Username, 3, 40) {
		errors = append(errors, "Firstname is required.")
	}

	// Email
	if !ValidateEmail(signupModel.Email) {
		errors = append(errors, "Email is not a valid email address.")
	}

	// Password
	if !ValidatePassword(signupModel.Password, 8) {
		errors = append(errors, "Password must be at least 8 characters, have no spaces, and be satisfy 3+ categories.")
	}

	return errors
}
