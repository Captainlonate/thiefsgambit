package gamelogic

import (
	"math/rand"
)

type SpinResultResponse struct {
	Reels     Board
	Value     int
	NewTotal  int
	PayLines  []PayLine
	FreeSpins int
}

func GetRandomPiece() Piece {
	randomIndex := rand.Intn(len(AllPieces))
	randomItem := AllPieces[randomIndex]
	return randomItem
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

func EvaluateBoard(board Board) SpinResultResponse {
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

	return SpinResultResponse{
		Reels:    board,
		Value:    SumWinsValue(wins),
		NewTotal: 12500,
		PayLines: ExtractPaylinesFromWins(wins),
	}
}
