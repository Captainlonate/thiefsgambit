package routes

import (
	"slotsserver/gamelogic"

	"github.com/gofiber/fiber/v2"
)

func HandleSpin(c *fiber.Ctx) error {
	board := gamelogic.GetRandomBoard()
	responseData := gamelogic.EvaluateBoard(board)

	return c.JSON(ApiResponse{
		Success: true,
		Error:   nil,
		Data:    responseData,
	})
}
