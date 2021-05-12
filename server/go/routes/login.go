package routes

import (
	"fmt"
	"time"

	ce "slotsserver/customError"
	"slotsserver/database"

	"github.com/gofiber/fiber/v2"
)

type LoginInputModel struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

/*
	Fiber route handler for when a user tries to log in.
	Expects the user to have POST a body with login
	credentials in the form of `LoginInputModel`.
*/
func HandleLogin(c *fiber.Ctx) error {
	// Parse the input the user sent
	credentials := new(LoginInputModel)
	if err := ParsePostBodyOrError(c, &credentials); err != nil {
		ExpireJWTCookie(c)
		return c.JSON(err)
	}

	fmt.Printf("Passed in login credentials:\n\t%+v\n", credentials)

	// Make sure they passed in something for the requried fields
	if credentials.Email == "" || credentials.Password == "" {
		fmt.Printf("HandleLogin error: Credentials are wrong or missing. %+v \n", credentials)
		ExpireJWTCookie(c)
		return c.JSON(ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.MissingCredentialsErrorCode,
				FriendlyMessage: "Missing email or password.",
			},
		})
	}

	// Try to find this user in DB, and verify their password
	dbUser, queryError := TryLoginOrError(credentials)
	if queryError != nil {
		ExpireJWTCookie(c)
		return c.JSON(queryError)
	}

	fmt.Printf("User:\n\t%+v\n", dbUser)

	// Create a signed JWT token
	expiresTime := time.Now().Add(time.Hour * 24)
	unsignedToken := CreateUnsignedToken(dbUser.ID, dbUser.Firstname, dbUser.Lastname, dbUser.Email, expiresTime.Unix())
	signedToken, signError := SignTokenOrError(unsignedToken)
	if signError != nil {
		ExpireJWTCookie(c)
		return c.JSON(signError)
	}

	// Set their HTTPOnly cookie with the JWT
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    signedToken,
		Expires:  expiresTime,
		HTTPOnly: true,
	})

	return c.JSON(ApiResponse{
		Success: true,
		Error:   nil,
		Data:    nil,
	})
}

/*
	Delete / Remove the JWT cookie from the client's browser.
*/
func ExpireJWTCookie(c *fiber.Ctx) {
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Expires:  time.Now().Add(-(time.Hour * 24)),
		HTTPOnly: true,
	})
	c.ClearCookie("jwt")
}

/*
	Checks if a user with the given email already exists in the
	database. If it does, then the provided password will be
	compared with the hashed password in the db. If the passwords
	match, then the verified user is returned. Otherwise, an
	error will be returned.
*/
func TryLoginOrError(loginForm *LoginInputModel) (*database.User, *ApiResponse) {
	dbUser, queryError := database.GetUserByEmail(loginForm.Email)

	// Was the query successful
	if queryError != nil {
		return nil, &ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.InternalServerErrorCode,
				FriendlyMessage: "Internal Server Error. User query failed.",
			},
		}
	}

	// Does the user exist
	if dbUser == nil {
		return nil, &ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.WrongEmailErrorCode,
				FriendlyMessage: "No user exists with that email.",
			},
		}
	}

	// Does the user's password match
	if !database.DoesPasswordMatchHash(loginForm.Password, dbUser.HashedPassword) {
		return nil, &ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.WrongPasswordErrorCode,
				FriendlyMessage: "Password is incorrect.",
			},
		}
	}

	return dbUser, nil
}
