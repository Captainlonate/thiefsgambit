package database

import (
	"log"
	"os"

	"golang.org/x/crypto/bcrypt"
)

/*
	Given a password string, returns a salted and hashed
	password string. The raw password will also be prefixed
	with something else.
*/
func HashAndSaltPassword(password string) string {
	// GenerateFromPassword will hash and salt the password already.
	// But I'm going to obfuscate all passwords with a prefix too
	prefixedPassword := os.Getenv("PASS_PREF") + password
	hash, err := bcrypt.GenerateFromPassword([]byte(prefixedPassword), bcrypt.DefaultCost)

	if err != nil {
		log.Println("HashAndSaltPassword:Could not hash the password", err)
	}

	return string(hash)
}

/*
	Returns true if the raw password matches the hashed password.
	Takes into account that the raw password was originally prefixed.
*/
func DoesPasswordMatchHash(password string, hashedPass string) bool {
	bytePassword := []byte(os.Getenv("PASS_PREF") + password)
	byteHashedPass := []byte(hashedPass)

	err := bcrypt.CompareHashAndPassword(byteHashedPass, bytePassword)
	if err != nil {
		log.Println("DoesPasswordMatchHash:Error comparing password:", err)
		return false
	}

	return true
}
