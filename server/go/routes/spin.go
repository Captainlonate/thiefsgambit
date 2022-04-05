package routes

import (
	"fmt"
	"log"
	ce "slotsserver/customError"
	db "slotsserver/database"
	logic "slotsserver/gamelogic"

	"github.com/gofiber/fiber/v2"
)

// ========================================================

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

// ========================================================

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
	slotsData, apiResponse := getUserSlotsData(c)
	if apiResponse != nil {
		return c.JSON(apiResponse)
	}

	// How much will this spin cost the user, and do they have enough
	spinCost := desiredBet * len(logic.PayLines)
	apiResponse = spinCheckEnoughToBet(slotsData, spinCost)
	if apiResponse != nil {
		return c.JSON(apiResponse)
	}

	// Subtract the cost of the spin, unless they have a free spin
	if slotsData.FreeSpins > 0 {
		slotsData.FreeSpins = slotsData.FreeSpins - 1
	} else {
		slotsData.Coins = slotsData.Coins - spinCost
	}

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
