package database

import "log"

func GetUserSlotsData(userId uint) (*SlotsData, error) {
	slotsData := []SlotsData{}

	err := DBConn.Limit(1).Select("id", "user_id", "coins", "free_spins").Where("user_id = ?", userId).Find(&slotsData).Error

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

func SaveSlotsData(newSlotsData *SlotsData) error {
	// Can't use DBConn.Save() because new object might
	// have zero fields from the original selection
	updateObj := SlotsData{
		Coins:     newSlotsData.Coins,
		FreeSpins: newSlotsData.FreeSpins,
	}

	updateError := DBConn.Model(&newSlotsData).Select("coins", "free_spins").Updates(updateObj).Error

	if updateError != nil {
		log.Printf(
			"UpdateSlotsData::Could not update SlotsData for\n\tUserID:'%v'\n\t%v\n",
			newSlotsData.UserID,
			updateError,
		)
		return updateError
	}

	return nil
}
