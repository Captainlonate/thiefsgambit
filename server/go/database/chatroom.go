package database

import (
	"log"

	ce "slotsserver/customError"
)

/*

 */
func IsChatroomNameInUse(name string) (bool, error) {
	chatRoom, err := GetChatroomByName(name)
	return chatRoom != nil, err
}

/*

 */
func GetChatroomByName(name string) (*ChatRoom, error) {
	existingChatrooms := []ChatRoom{}

	err := DBConn.Limit(1).Where("room_name = ?", name).Find(&existingChatrooms).Error
	if err != nil {
		log.Printf("GetChatroomByName::Could not query for\n'%s'\n%s\n", name, err)
		return nil, err
	}

	if len(existingChatrooms) > 0 {
		return &existingChatrooms[0], nil
	}

	return nil, nil
}

/*

 */
func InsertNewChatroom(newChatRoom *ChatRoom) *ce.ApiError {
	alreadyTaken, _ := IsChatroomNameInUse(newChatRoom.RoomName)

	if alreadyTaken {
		log.Printf("InsertNewChatroom::Could not insert new Chatroom. '%s' already exists\n", newChatRoom.RoomName)
		return &ce.ApiError{
			Code:            ce.InsertUniqueErrorCode,
			FriendlyMessage: "Chat room name already in use.",
			Err:             nil,
		}
	}

	insertError := DBConn.Create(&newChatRoom).Error
	if insertError != nil {
		log.Printf("InsertNewChatroom::Could not insert new Chatroom '%s'. Maybe constraint?\n", newChatRoom.RoomName)
		return &ce.ApiError{
			Code:            ce.InsertErrorCode,
			FriendlyMessage: "Error when inserting new Chatroom.",
			Err:             insertError,
		}
	}

	return nil
}
