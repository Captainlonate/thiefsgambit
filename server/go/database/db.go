package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DBConn *gorm.DB

const baseDSN = "host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/New_York"

func ConnectToDB() {
	var err error

	url := os.Getenv("DB_URL")
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")
	dbport := os.Getenv("DB_PORT")

	dataSourceName := fmt.Sprintf(baseDSN, url, user, pass, dbname, dbport)

	DBConn, err = gorm.Open(postgres.Open(dataSourceName), &gorm.Config{})

	if err != nil {
		log.Fatalln("Could not connect to the database.")
	}
	log.Println("Connected to database")

	DBConn.AutoMigrate(&User{}, &SlotsData{}, &ChatRoom{}, &ChatMessage{})
	// InsertNewChatMessage(1, 1, "Second message!")
	// Seed()
}

func Seed() {
	// Clear the database
	DBConn.Migrator().DropTable(&User{})
	DBConn.Migrator().DropTable(&SlotsData{})
	DBConn.Migrator().DropTable(&ChatRoom{})
	DBConn.Migrator().DropTable(&ChatMessage{})

	// Migrate Tables
	DBConn.AutoMigrate(&User{}, &SlotsData{}, &ChatRoom{}, &ChatMessage{})

	// User
	InsertNewUser(&User{
		Username:       "Captainlonate",
		Email:          "captainlonate@email.com",
		HashedPassword: HashAndSaltPassword("P@ssword"),
		IsElite:        true,
		SlotsData: SlotsData{
			FreeSpins: 0,
			Coins:     2400,
		},
	})

	InsertNewUser(&User{
		Username:       "ktell10",
		Email:          "kathy@email.com",
		HashedPassword: HashAndSaltPassword("P@ssword"),
		IsElite:        true,
		SlotsData: SlotsData{
			FreeSpins: 0,
			Coins:     2400,
		},
	})

	InsertNewUser(&User{
		Username:       "rratliff",
		Email:          "regina@email.com",
		HashedPassword: HashAndSaltPassword("P@ssword"),
		IsElite:        true,
		SlotsData: SlotsData{
			FreeSpins: 0,
			Coins:     2400,
		},
	})

	InsertNewUser(&User{
		Username:       "averagejoe",
		Email:          "averagejoe@email.com",
		HashedPassword: HashAndSaltPassword("P@ssword"),
		IsElite:        false,
		SlotsData: SlotsData{
			FreeSpins: 0,
			Coins:     2400,
		},
	})

	// Chat Rooms

	InsertNewChatroom(&ChatRoom{
		RoomName:  "Círculo del Capitán",
		EliteOnly: true,
	})

	InsertNewChatroom(&ChatRoom{
		RoomName:  "Pirate Legends",
		EliteOnly: false,
	})

	InsertNewChatroom(&ChatRoom{
		RoomName:  "Mischief Makers",
		EliteOnly: false,
	})

	InsertNewChatroom(&ChatRoom{
		RoomName:  "Commodity Kings",
		EliteOnly: false,
	})

	InsertNewChatroom(&ChatRoom{
		RoomName:  "Fortune Finders",
		EliteOnly: false,
	})

	InsertNewChatroom(&ChatRoom{
		RoomName:  "Cash Stashers",
		EliteOnly: false,
	})

	// Insert initial chat messages
	InsertNewChatMessage(1, 1, "Welcome Mateys!")
	InsertNewChatMessage(2, 1, "Welcome Mateys!")
	InsertNewChatMessage(3, 1, "Welcome Mateys!")
	InsertNewChatMessage(4, 1, "Welcome Mateys!")
	InsertNewChatMessage(5, 1, "Welcome Mateys!")
	InsertNewChatMessage(6, 1, "Welcome Mateys!")
}
