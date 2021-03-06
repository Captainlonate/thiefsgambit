package routes

import (
	"log"
	ce "slotsserver/customError"
	db "slotsserver/database"

	"github.com/gofiber/fiber/v2"
)

/*
	Retrieve the user's slots data from the database.
	Determine's which user to look up, by looking for a "userid" in
	fiber's Context.Locals.
	If everything goes well, returns their slots data.
	Otherwise, an ApiResponse will be returned if:
		- There was no userid in locals.
		- The query could not find SlotsData for that userId
		- The query simply fails for some other reason
*/
func getUserSlotsData(c *fiber.Ctx) (*db.SlotsData, *ApiResponse) {
	var apiResponse ApiResponse
	// If c.Locals("thing") is nil, the type assertion will return: 0, false
	userId, ok := c.Locals("userid").(uint)
	if !ok {
		log.Printf("HandleSpin::Could not get userid from token: %v\n\n", c.Locals("userid"))
		apiResponse = MakeFailure(
			ce.NoUserIdInTokenErrorCode,
			"Could not find uuid in token.",
		)
		return nil, &apiResponse
	}

	// Get the user's slots data from the database
	slotsData, queryErr := db.GetUserSlotsData(userId)

	// If the query for SlotsData errored (missing column?)
	if queryErr != nil {
		log.Printf("HandleSpin::Could not query user's SlotsData:\n\t%v\n\n", queryErr)
		apiResponse = MakeFailure(
			ce.InternalServerErrorCode,
			"Could not get User's slots data.",
		)
		return nil, &apiResponse
	}

	// No SlotsData for user id
	if slotsData == nil {
		log.Printf("HandleSpin::There is no SlotsData for user id: %v\n\n", userId)
		apiResponse = MakeFailure(
			ce.InternalServerErrorCode,
			"No SlotsData for this user.",
		)
		return nil, &apiResponse
	}

	return slotsData, nil
}
