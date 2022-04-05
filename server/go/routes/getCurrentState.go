package routes

import (
	"github.com/gofiber/fiber/v2"
)

// ========================================================

type CurrentStateResults struct {
	// The user's total amount of coins
	TotalCredits      int   `json:"totalcredits"`
	PreviousBet       int   `json:"previousbet"`
	PossibleBetValues []int `json:"possiblebets"`
}

// ========================================================

/*
	Fiber route handler for when a user requests to spin.
*/
func HandleGetCurrentState(c *fiber.Ctx) error {
	var apiResponse *ApiResponse

	// Get the user's current slots data from the database
	slotsData, apiResponse := getUserSlotsData(c)
	if apiResponse != nil {
		return c.JSON(apiResponse)
	}

	return c.JSON(ApiResponse{
		Success: true,
		Error:   nil,
		Data: CurrentStateResults{
			TotalCredits:      slotsData.Coins,
			PreviousBet:       possibleBetAmounts[0],
			PossibleBetValues: possibleBetAmounts,
		},
	})
}
