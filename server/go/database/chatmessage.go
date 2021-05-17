package database

import (
	"log"

	ce "slotsserver/customError"
)

/*

 */
func InsertNewChatMessage(chatRoomId uint, userId uint, message string) *ce.ApiError {
	newMessage := ChatMessage{
		AuthorId:   userId,
		ChatRoomID: chatRoomId,
		Message:    message,
	}

	insertError := DBConn.Create(&newMessage).Error
	if insertError != nil {
		log.Printf(
			"InsertNewChatMessage::Could not insert new Chat Message into:\n\t'%v',\n\t'%v',\n\t'%v'\nMaybe constraint?\n",
			chatRoomId,
			userId,
			message,
		)
		return &ce.ApiError{
			Code:            ce.InsertErrorCode,
			FriendlyMessage: "Error when inserting new Chat message.",
			Err:             insertError,
		}
	}

	return nil
}
