package gamelogic

import "math/rand"

type Piece string

type Reel [3]Piece

type Board [5]Reel

const (
	TYPE_COMPASS Piece = "compass"
	TYPE_ANCHOR  Piece = "anchor"
	TYPE_MAP     Piece = "map"
)

var AllPieces = []Piece{
	TYPE_COMPASS,
	TYPE_ANCHOR,
	TYPE_MAP,
}

func GetRandomPiece() Piece {
	randomIndex := rand.Intn(len(AllPieces))
	randomItem := AllPieces[randomIndex]
	return randomItem
}
