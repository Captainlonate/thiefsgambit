module slotsserver

go 1.16

replace slotsserver/gamelogic => ./gamelogic

replace slotsserver/database => ./database

replace slotsserver/routes => ./routes

replace slotsserver/customError => ./customError

require (
	github.com/andybalholm/brotli v1.0.2 // indirect
	github.com/form3tech-oss/jwt-go v3.2.2+incompatible
	github.com/gofiber/fiber/v2 v2.9.0
	github.com/joho/godotenv v1.3.0
	github.com/klauspost/compress v1.12.2 // indirect
	github.com/stretchr/testify v1.6.1 // indirect
	github.com/valyala/fasthttp v1.24.0 // indirect
	github.com/valyala/tcplisten v1.0.0 // indirect
	golang.org/x/crypto v0.0.0-20210322153248-0c34fe9e7dc2
	golang.org/x/sys v0.0.0-20210507161434-a76c4d0a0096 // indirect
	gorm.io/driver/postgres v1.1.0
	gorm.io/gorm v1.21.9
)
