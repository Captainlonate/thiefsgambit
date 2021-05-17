package database

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username       string `json:"username" gorm:"not null;size:255;unique"`
	Email          string `json:"email" gorm:"not null;unique;size:255"`
	HashedPassword string `gorm:"not null"`
	IsElite        bool   `json:"iselite" gorm:"not null;size:200"`

	SlotsData    SlotsData     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	ChatMessages []ChatMessage `gorm:"foreignKey:AuthorId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type SlotsData struct {
	gorm.Model
	UserID    uint
	Coins     int `json:"coins"`
	FreeSpins int `json:"freespins"`
}

type ChatRoom struct {
	gorm.Model
	RoomName  string `json:"roomname" gorm:"size:200;unique;not null"`
	EliteOnly bool   `json:"eliteonly" gorm:"not null"`

	ChatMessages []ChatMessage `gorm:"foreignKey:AuthorId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type ChatMessage struct {
	gorm.Model
	AuthorId   uint   `json:"authorid" gorm:"not null"`
	ChatRoomID uint   `json:"chatroomid" gorm:"not null"`
	Message    string `json:"message" gorm:"size:255"`
}
