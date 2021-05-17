package database

import (
	"fmt"
	"log"

	ce "slotsserver/customError"
)

/*
	Checks the Users table for a User with the provided
	emailAddress. Returns true if the user is already
	in the database.
*/
func IsEmailInUse(emailAddress string) (bool, error) {
	user, err := GetUserByEmail(emailAddress)
	return user != nil, err
}

/*
	Query the database for a user based on their unique email address.
	Either returns the located User object, or nil if it couldn't be found.
	If the query fails, returns an error.
*/
func GetUserByEmail(emailAddress string) (*User, error) {
	existingUsers := []User{}

	err := DBConn.Limit(1).Where("email = ?", emailAddress).Find(&existingUsers).Error
	if err != nil {
		log.Printf("GetUserByEmail::Could not query for\n'%s'\n%s\n", emailAddress, err)
		return nil, err
	}

	if len(existingUsers) > 0 {
		return &existingUsers[0], nil
	}

	return nil, nil
}

/*
	Query the database for a user based on their unique email address.
	Either returns the located User object, or nil if it couldn't be found.
	If the query fails, returns an error.
*/
func GetUserByUsername(username string) (*User, error) {
	existingUsers := []User{}

	err := DBConn.Limit(1).Where("username = ?", username).Find(&existingUsers).Error
	if err != nil {
		log.Printf("GetUserByUsername::Could not query for\n'%s'\n%s\n", username, err)
		return nil, err
	}

	if len(existingUsers) > 0 {
		return &existingUsers[0], nil
	}

	return nil, nil
}

/*
	Given a User object, first checks if the user is already
	in the database (by looking at email). Returns an error
	if the user is already in the database. Otherwise,
	inserts the user into the database (modifying the object
	passed in).
*/
func InsertNewUser(newUser *User) *ce.ApiError {
	alreadyTaken, _ := IsEmailInUse(newUser.Email)

	if alreadyTaken {
		log.Printf("InsertNewUser::Could not insert new user. '%s' already exists\n", newUser.Email)
		return &ce.ApiError{
			Code:            ce.InsertUniqueErrorCode,
			FriendlyMessage: "Email address already in use.",
			Err:             fmt.Errorf("user with email '%v' already exists", newUser.Email),
		}
	}

	insertError := DBConn.Create(&newUser).Error
	if insertError != nil {
		log.Printf("InsertNewUser::Could not insert new user '%s'. Maybe constraint?\n", newUser.Email)
		return &ce.ApiError{
			Code:            ce.InsertErrorCode,
			FriendlyMessage: "Error when inserting new user.",
			Err:             insertError,
		}
	}

	return nil
}
