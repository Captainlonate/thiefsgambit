package server

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func Run() {
	app := fiber.New()
	app.Get("/spin", handleSpin)
	log.Fatal(app.Listen(":3001"))
}

func handleSpin(c *fiber.Ctx) error {
	board := GetRandomBoard()
	responseData := EvaluateBoard(board)

	return c.JSON(responseData)
}
