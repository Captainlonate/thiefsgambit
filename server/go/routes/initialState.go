package routes

import (
	"fmt"
	"log"
	ce "slotsserver/customError"
	db "slotsserver/database"
	logic "slotsserver/gamelogic"

	"github.com/gofiber/fiber/v2"
)

type InitialStateResults struct {
	// The user's total amount of coins
	NewTotal int `json:"newtotal"`
}

/*
	Fiber route handler for when a user requests to spin.
*/
func HandleGetInitialState(c *fiber.Ctx) error {
	// TODO: DON'T LET THEM SPIN WHILE SPINNING... SOMEHOW
	var apiResponse *ApiResponse

	// Get the user's current slots data from the database
	slotsData, apiResponse := spinGetUserSlotsData(c)
	if apiResponse != nil {
		return c.JSON(apiResponse)
	}

	// What will this spin cost the user, and do they have enough
	spinCost := desiredBet * len(logic.PayLines)
	apiResponse = spinCheckEnoughToBet(slotsData, spinCost)
	if apiResponse != nil {
		return c.JSON(apiResponse)
	}

	// Subtract the cost of the spin, unless they have a free spin
	spinApplySpinCost(slotsData, spinCost)

	// Spin! Create a new board and evaluate it
	board := logic.GetRandomBoard()
	boardEvaluation := logic.EvaluateBoard(board)

	// Update the user's new total and free spins count
	howMuchTheyWon := desiredBet * boardEvaluation.Value
	slotsData.Coins += howMuchTheyWon
	if boardEvaluation.FreeSpins {
		slotsData.FreeSpins += 15
	}

	// Save/Commit this SlotsData back to the database
	if updateErr := db.SaveSlotsData(slotsData); updateErr != nil {
		log.Printf("Failed to update user's (%v) SlotsData.\n", slotsData.UserID)
		return c.JSON(MakeFailure(
			ce.InternalServerErrorCode,
			"Internal Server Error. Unable to update User's SlotsData.",
		))
	}

	return c.JSON(ApiResponse{
		Success: true,
		Error:   nil,
		Data: SpinResults{
			Reels:     boardEvaluation.Reels,
			Value:     howMuchTheyWon,
			NewTotal:  slotsData.Coins,
			PayLines:  boardEvaluation.PayLines,
			FreeSpins: slotsData.FreeSpins,
		},
	})
}

func spinGetUserSlotsData(c *fiber.Ctx) (*db.SlotsData, *ApiResponse) {
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