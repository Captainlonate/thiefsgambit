package routes

import (
	"fmt"

	ce "slotsserver/customError"

	"github.com/gofiber/fiber/v2"
)

/*
	Parse the JSON POST body into a struct
*/
func ParsePostBodyOrError(c *fiber.Ctx, parseInto interface{}) *ApiResponse {
	if len(c.Body()) == 0 {
		return &ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.EmptyPostBodyErrorCode,
				FriendlyMessage: "POST body was empty.",
			},
		}
	}

	if err := c.BodyParser(&parseInto); err != nil {
		fmt.Printf("ParsePostBodyOrError error: The content-type is probably wrong %v \n", err)
		return &ApiResponse{
			Success: false,
			Error: &ce.ApiError{
				Code:            ce.BadContentTypeErrorCode,
				FriendlyMessage: "The content-type is probably wrong.",
				Err:             err,
			},
		}
	}

	return nil
}
