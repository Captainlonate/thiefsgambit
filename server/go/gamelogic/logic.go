package gamelogic

type BoardEvaluation struct {
	// The state of the board with all it's pieces
	Reels Board `json:"reels"`
	// The total value of this board's win conditions
	Value int `json:"value"`
	// The paylines that contain win conditions
	PayLines []PayLine `json:"paylines"`
	// Did this board award Free Spins
	FreeSpins bool `json:"freespins"`
}

func GetRandomBoard() Board {
	return Board{
		Reel{GetRandomPiece(), GetRandomPiece(), GetRandomPiece()},
		Reel{GetRandomPiece(), GetRandomPiece(), GetRandomPiece()},
		Reel{GetRandomPiece(), GetRandomPiece(), GetRandomPiece()},
		Reel{GetRandomPiece(), GetRandomPiece(), GetRandomPiece()},
		Reel{GetRandomPiece(), GetRandomPiece(), GetRandomPiece()},
	}
}

/*
	Returns true if a ReelLine (one item from all 5 reels),
	begins with the pieces provided in `pieces`. Note that
	`pieces` may not be the same size (since some win conditions
	only require 3, or 4 at the beginning)
*/
func DoesReelLineStartWith(reelLine []Piece, pieces []Piece) bool {
	if len(reelLine) < len(pieces) {
		return false
	}

	for idx, piece := range pieces {
		if piece != reelLine[idx] {
			return false
		}
	}

	return true
}

/*
	Given a board (5 reels of 3 pieces each), determine
	it's value. Looks through each payline, and finds
	the most valuable win condition for that payline (if any).
	Adds up all the values of the winning paylines.
*/
func EvaluateBoard(board Board) BoardEvaluation {
	wins := []Win{}

	// Go through every PayLine and see if there is a match
	for _, pl := range PayLines {
		// Gather the Pieces that fit in this PayLine
		reelLine := make([]Piece, 5)
		for idx := 0; idx < 5; idx++ {
			reelLine[idx] = board[idx][pl[idx]]
		}

		foundAWin, bestWinCondition := FindBestWinCondition(reelLine)

		if foundAWin {
			wins = append(wins, Win{
				WinCondition: bestWinCondition,
				PayLine:      pl,
			})
		}
	}

	return BoardEvaluation{
		Reels:     board,
		Value:     SumWinsValue(wins),
		PayLines:  ExtractPaylinesFromWins(wins),
		FreeSpins: ContainsFreeSpins(wins),
	}
}
