package routes

import (
	"fmt"
	"log"
	ce "slotsserver/customError"
	db "slotsserver/database"
	logic "slotsserver/gamelogic"

	"github.com/gofiber/fiber/v2"
)

type SpinInputModel struct {
	Bet int `json:"bet"`
}

type SpinResults struct {
	// The state of the board with all it's pieces
	Reels logic.Board `json:"reels"`
	// The total value of this board's win conditions
	Value int `json:"value"`
	// The user's new total amount of coins
	NewTotal int `json:"newtotal"`
	// The paylines that contain win conditions
	PayLines []logic.PayLine `json:"paylines"`
	// Did this board award Free Spins
	FreeSpins int `json:"freespins"`
}

var validBetAmounts = map[int]bool{1: true, 2: true, 3: true}

/*
	Fiber route handler for when a user requests to spin.
*/
func HandleSpin(c *fiber.Ctx) error {
	// TODO: DON'T LET THEM SPIN WHILE SPINNING... SOMEHOW
	var apiResponse *ApiResponse

	// Determine how much the user wants to bet
	desiredBet, apiResponse := spinGetDesiredBet(c)
	if apiResponse != nil {
		return c.JSON(apiResponse)
	}

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

/*

 */
func spinValidateBetAmount(bet int) *ApiResponse {
	if !validBetAmounts[bet] {
		err := MakeFailure(
			ce.InvalidBetAmountErrorCode,
			fmt.Sprintf("%v is an invalid bet amount", bet),
		)
		return &err
	}
	return nil
}

/*

 */
func spinGetDesiredBet(c *fiber.Ctx) (int, *ApiResponse) {
	// Parse the user's desired bet amount
	spinInput := new(SpinInputModel)
	if apiResponse := ParsePostBodyOrError(c, &spinInput); apiResponse != nil {
		return 0, apiResponse
	}

	// Are they trying to bet an unsupported amount
	if apiResponse := spinValidateBetAmount(spinInput.Bet); apiResponse != nil {
		return 0, apiResponse
	}

	return spinInput.Bet, nil
}

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

/*
	Check if the user has enough coin to spin. They won't need any
	if they have a free spin stored.
	If they don't have enough, an ApiResponse is returned.
*/
func spinCheckEnoughToBet(slotsData *db.SlotsData, spinCost int) *ApiResponse {
	if !(slotsData.FreeSpins > 0) && !(slotsData.Coins >= spinCost) {
		log.Printf("HandleSpin::Not enough coins (%v) to spin (%v)\n\n", slotsData.Coins, spinCost)
		apiResponse := MakeFailure(ce.InsufficientCoinsErrorCode, "Insufficient coins.")
		return &apiResponse
	}

	return nil
}

/*
	Subtract the cost of the spin (unless it's free)
	Modifies the slotsData object passed in.
*/
func spinApplySpinCost(slotsData *db.SlotsData, spinCost int) {
	if slotsData.FreeSpins > 0 {
		slotsData.FreeSpins = slotsData.FreeSpins - 1
	} else {
		slotsData.Coins = slotsData.Coins - spinCost
	}
}
