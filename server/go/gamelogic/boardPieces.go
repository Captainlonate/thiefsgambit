package gamelogic

type Piece string

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

type Reel [3]Piece

type Board [5]Reel
