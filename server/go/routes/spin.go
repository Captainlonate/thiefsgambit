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

var validBetAmounts = map[int]bool{30: true, 60: true, 90: true}

func HandleSpin(c *fiber.Ctx) error {
	// Parse the user's bet amount
	spinInput := new(SpinInputModel)
	if err := ParsePostBodyOrError(c, &spinInput); err != nil {
		return c.JSON(err)
	}

	log.Printf("HandleSpin:: SpinInputModel:\n\t%+v\n\n", spinInput)

	// Validate possible Bet amounts
	if !validBetAmounts[spinInput.Bet] {
		return c.JSON(MakeFailure(
			ce.InvalidBetAmountErrorCode,
			fmt.Sprintf("%v is an invalid bet amount", spinInput.Bet),
		))
	}

	// If c.Locals("thing") is nil, the type assertion
	// will return: 0, false
	userId, ok := c.Locals("userid").(uint)
	if !ok {
		log.Printf("HandleSpin::Could not get userid from token: %v\n\n", c.Locals("userid"))
		return c.JSON(MakeFailure(
			ce.NoUserIdInTokenErrorCode,
			"Could not find uuid in token.",
		))
	}

	// Get the user's slots data
	slotsData, queryErr := db.GetUserSlotsData(userId)

	// If the query for SlotsData errored (missing column?)
	if queryErr != nil {
		log.Printf("HandleSpin::Could not query user's SlotsData:\n\t%v\n\n", queryErr)
		return c.JSON(MakeFailure(
			ce.InternalServerErrorCode,
			"Could not get User's slots data.",
		))
	}

	// No SlotsData for user id
	if slotsData == nil {
		log.Printf("HandleSpin::There is no SlotsData for user id: %v\n\n", userId)
		return c.JSON(MakeFailure(
			ce.InternalServerErrorCode,
			"No SlotsData for this user.",
		))
	}

	log.Printf("HandleSpin::Got SlotsData:\n\t%+v\n\n", slotsData)

	// Did the user have enough money to make this spin

	// Create a new board and evaluate it
	board := logic.GetRandomBoard()
	boardEvaluation := logic.EvaluateBoard(board)

	// Update the user's new total

	return c.JSON(ApiResponse{
		Success: true,
		Error:   nil,
		Data: SpinResults{
			Reels:     boardEvaluation.Reels,
			Value:     boardEvaluation.Value,
			NewTotal:  2400,
			PayLines:  boardEvaluation.PayLines,
			FreeSpins: 0,
		},
	})
}
