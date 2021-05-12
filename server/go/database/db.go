package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DBConn *gorm.DB

const baseDSN = "host=%s user=%s password=%s dbname=%s port=5433 sslmode=disable TimeZone=America/New_York"

func ConnectToDB() {
	var err error

	url := os.Getenv("DB_URL")
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")

	dataSourceName := fmt.Sprintf(baseDSN, url, user, pass, dbname)

	DBConn, err = gorm.Open(postgres.Open(dataSourceName), &gorm.Config{})

	if err != nil {
		log.Fatalln("Could not connect to the database.")
	}
	log.Println("Connected to database")
	InitDB()
}

/*
	Can use the AutoMigrate:
		DBConn.AutoMigrate(&User{})
	Can use the Migrator interface:
		fmt.Println(DBConn.Migrator().CurrentDatabase())
*/
func InitDB() {
	DBConn.AutoMigrate(&User{}, &SlotsData{})
}
