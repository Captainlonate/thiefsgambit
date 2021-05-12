package routes

import (
	"fmt"
	"os"

	ce "slotsserver/customError"

	jwt "github.com/form3tech-oss/jwt-go"
)

type TokenClaims struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Email     string `json:"email"`
	Exp       int64
	jwt.StandardClaims
}

func JWTKeyFunction(token *jwt.Token) (interface{}, error) {
	return []byte(os.Getenv("JWT_SIGN_KEY")), nil
}

func CreateUnsignedToken(firstname string, lastname string, email string, expires int64) *jwt.Token {
	return jwt.NewWithClaims(jwt.SigningMethodHS256, TokenClaims{
		Firstname: firstname,
		Lastname:  lastname,
		Email:     email,
		Exp:       expires,
	})
}

func SignTokenOrError(unsignedToken *jwt.Token) (string, *ApiResponse) {
	signedToken, signError := unsignedToken.SignedString([]byte(os.Getenv("JWT_SIGN_KEY")))

	if signError != nil {
		fmt.Printf("HandleLogin error: Could not sign the JWT %v", signError)
		return "", &ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.InternalServerErrorCode,
				FriendlyMessage: "Could not sign the JWT.",
				Err:             nil,
			},
		}
	}

	return signedToken, nil
}
