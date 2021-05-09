package server

// type Piece struct {
// 	Name  string
// 	Value int
// }

type Piece string

// var AllPieces = []Piece{
// 	{Name: "compass", Value: 10},
// 	{Name: "anchor", Value: 20},
// 	{Name: "map", Value: 50},
// }

const (
	TYPE_COMPASS Piece = "compass"
	TYPE_ANCHOR  Piece = "anchor"
	TYPE_MAP     Piece = "map"
)

// var PieceDictionary = map[string]string{
// 	"compass": "compass",
// 	"anchor":  "anchor",
// 	"map":     "map",
// }

var AllPieces = []Piece{
	TYPE_COMPASS,
	TYPE_ANCHOR,
	TYPE_MAP,
}

type Reel [3]Piece

type Board [5]Reel

// func (board Board) GetAllPayLinePieces() [][5]Piece {
// 	payLinePieces := [][5]Piece{}
// 	for _, pl := range PayLines {
// 		reelLine := [5]Piece{}
// 		for idx := 0; idx < 5; idx++ {
// 			reelLine[idx] = board[idx][pl[idx]-1]
// 		}
// 		payLinePieces = append(payLinePieces, reelLine)
// 	}
// 	return payLinePieces
// }
