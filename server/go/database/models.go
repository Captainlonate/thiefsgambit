package database

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Firstname      string `json:"firstname" gorm:"size:255"`
	Lastname       string `json:"lastname" gorm:"size:255"`
	Email          string `json:"email" gorm:"not null;unique;size:255"`
	HashedPassword string `gorm:"not null"`

	SlotsData SlotsData `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type SlotsData struct {
	gorm.Model
	UserID uint
	Coins  uint64 `json:"coins"`
}
