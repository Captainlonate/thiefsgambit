package routes

import "github.com/gofiber/fiber/v2"

func HandleLogout(c *fiber.Ctx) error {
	ExpireJWTCookie(c)
	return c.JSON(ApiResponse{
		Success: true,
	})
}
