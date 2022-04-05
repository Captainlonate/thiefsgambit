package main

import (
	"log"
	"math/rand"
	"os"
	db "slotsserver/database"
	"slotsserver/routes"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	LoadEnvironmentFile()
	db.ConnectToDB()
	StartFiber()
}

/*
	Adds the environment variables in the local .env
	file to be accessible with os.Getenv("ENV_NAME")
*/
func LoadEnvironmentFile() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

/*
	Sets up fiber, then turns it on
*/
func StartFiber() {
	app := SetUpFiber()
	SetUpRoutes(app)
	if os.Getenv("RUN_ENVIRONMENT") == "development" {
		log.Fatal(app.Listen(":3001"))
	} else {
		log.Fatal(app.ListenTLS(":3001", "./certs/ssl.cert", "./certs/ssl.key"))
	}
}

/*
	Creates a new Fiber instance (with configuration)
*/
func SetUpFiber() (app *fiber.App) {
	rand.Seed(time.Now().UnixNano())
	app = fiber.New()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	return
}

/*
	Sets up each of the Fiber routes, and their corresponding
	middleware and route handlers.
*/
func SetUpRoutes(app *fiber.App) {
	app.Get("/isloggedin", routes.ProtectRouteMiddleware, HandleJustReturnSuccess)
	app.Post("/login", routes.HandleLogin)
	app.Post("/logout", routes.HandleLogout)
	app.Post("/signup", routes.HandleSignup)
	app.Post("/spin", routes.ProtectRouteMiddleware, routes.HandleSpin)
	app.Post("/currentstate", routes.ProtectRouteMiddleware, routes.HandleGetCurrentState)
}

/*
	One use for this is for informing the client
	whether or not they are currently logged in.
	Earlier middleware can reject invalid JWT's.
	So, if the request makes it here, then they
	must be logged in.
*/
func HandleJustReturnSuccess(c *fiber.Ctx) error {
	return c.JSON(routes.ApiResponse{Success: true})
}
