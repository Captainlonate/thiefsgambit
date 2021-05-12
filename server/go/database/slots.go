package database

import "log"

func GetUserSlotsData(userId uint) (*SlotsData, error) {
	slotsData := []SlotsData{}

	err := DBConn.Limit(1).Select("id", "user_id", "coins").Where("user_id = ?", userId).Find(&slotsData).Error

	// This would error if a column didn't exist, for instance
	if err != nil {
		log.Printf("GetUserSlotsData::Could not query for\n\tUserID:'%v'\n\t%s\n\n", userId, err)
		return nil, err
	}

	if len(slotsData) > 0 {
		return &slotsData[0], nil
	}

	return nil, nil
}
