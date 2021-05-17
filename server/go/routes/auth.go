package routes

import (
	"fmt"

	ce "slotsserver/customError"

	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func ProtectRouteMiddleware(c *fiber.Ctx) error {
	jwtCookie := c.Cookies("jwt")

	if jwtCookie == "" {
		fmt.Println("Auth:Missing/No Token")
		return c.JSON(ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.NotLoggedInErrorCode,
				FriendlyMessage: "Missing/No Token.",
			},
		})
	}

	token, err := jwt.ParseWithClaims(jwtCookie, &TokenClaims{}, JWTKeyFunction)

	// Regardless of the token contents, if the secret
	// key is wrong, there will be an error
	if err != nil {
		fmt.Println("Auth: JWT Exists but has invalid signature:", err)
		return c.JSON(ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.BadJWTErrorCode,
				FriendlyMessage: "Bad/Malformed/Unverifiable Token.",
				Err:             err,
			},
		})
	}

	claims, ok := token.Claims.(*TokenClaims)

	if ok && token.Valid {
		fmt.Printf("\nAuth: Claims:\n\t%+v\n", claims)
		c.Locals("userid", claims.Uuid)
		c.Locals("username", claims.Username)
		c.Locals("iselite", claims.IsElite)
		c.Locals("email", claims.Email)
		c.Locals("expiration", claims.Exp)
	} else {
		fmt.Println("Auth: Invalid JWT", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "invalid_jwt"})
	}

	return c.Next()
}
