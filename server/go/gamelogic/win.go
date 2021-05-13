package gamelogic

type WinType string

const (
	WIN_REGULAR   WinType = "regular"
	WIN_FREE_SPIN WinType = "freespin"
)

type Win struct {
	WinCondition WinCondition
	PayLine      PayLine
}

type WinCondition struct {
	Pieces  []Piece
	Value   int
	WinType WinType
}

func SumWinsValue(wins []Win) int {
	sum := 0
	for _, win := range wins {
		sum += win.WinCondition.Value
	}
	return sum
}

func ExtractPaylinesFromWins(wins []Win) []PayLine {
	payLines := make([]PayLine, len(wins))
	for idx, v := range wins {
		payLines[idx] = v.PayLine
	}
	return payLines
}

/*
	Returns true if any win in the slice rewards
	free spins.
*/
func ContainsFreeSpins(wins []Win) bool {
	for _, v := range wins {
		if v.WinCondition.WinType == WIN_FREE_SPIN {
			return true
		}
	}
	return false
}

/*
	Compare a reelLine to all win conditions and find
	the matching WinCondition with the largest value
*/
func FindBestWinCondition(reelLine []Piece) (bool, WinCondition) {
	foundAWin := false
	var bestWinCondition WinCondition

	// TODO: This needs to always choose free spins
	// Do a manual check for free spins
	// Which is *, bonus, bonus, freespins, *
	// If not free spins, then look for a regular
	// Option 2) Make free spins just be 4 "Free Spins"
	// in the beginning

	for _, wc := range WinConditions {
		if DoesReelLineStartWith(reelLine, wc.Pieces) {
			// Found a win, but is it the best?
			if !foundAWin || bestWinCondition.Value < wc.Value {
				foundAWin = true
				bestWinCondition = wc
			}
		}
	}

	return foundAWin, bestWinCondition
}

var WinConditions = []WinCondition{
	// Compass
	{
		Pieces:  []Piece{TYPE_COMPASS, TYPE_COMPASS, TYPE_COMPASS},
		Value:   30,
		WinType: WIN_REGULAR,
	},
	{
		Pieces:  []Piece{TYPE_COMPASS, TYPE_COMPASS, TYPE_COMPASS, TYPE_COMPASS},
		Value:   75,
		WinType: WIN_REGULAR,
	},
	{
		Pieces:  []Piece{TYPE_COMPASS, TYPE_COMPASS, TYPE_COMPASS, TYPE_COMPASS, TYPE_COMPASS},
		Value:   100,
		WinType: WIN_REGULAR,
	},
	// Anchor
	{
		Pieces:  []Piece{TYPE_ANCHOR, TYPE_ANCHOR, TYPE_ANCHOR},
		Value:   20,
		WinType: WIN_REGULAR,
	},
	{
		Pieces:  []Piece{TYPE_ANCHOR, TYPE_ANCHOR, TYPE_ANCHOR, TYPE_ANCHOR},
		Value:   60,
		WinType: WIN_REGULAR,
	},
	{
		Pieces:  []Piece{TYPE_ANCHOR, TYPE_ANCHOR, TYPE_ANCHOR, TYPE_ANCHOR, TYPE_ANCHOR},
		Value:   100,
		WinType: WIN_REGULAR,
	},
	// Treasure Map
	{
		Pieces:  []Piece{TYPE_MAP, TYPE_MAP, TYPE_MAP},
		Value:   50,
		WinType: WIN_REGULAR,
	},
	{
		Pieces:  []Piece{TYPE_MAP, TYPE_MAP, TYPE_MAP, TYPE_MAP},
		Value:   90,
		WinType: WIN_REGULAR,
	},
	{
		Pieces:  []Piece{TYPE_MAP, TYPE_MAP, TYPE_MAP, TYPE_MAP, TYPE_MAP},
		Value:   120,
		WinType: WIN_REGULAR,
	},
	// Picture Frame
	{
		Pieces:  []Piece{TYPE_FRAME, TYPE_FRAME, TYPE_FRAME},
		Value:   20,
		WinType: WIN_REGULAR,
	},
	{
		Pieces:  []Piece{TYPE_FRAME, TYPE_FRAME, TYPE_FRAME, TYPE_FRAME},
		Value:   40,
		WinType: WIN_REGULAR,
	},
	{
		Pieces:  []Piece{TYPE_FRAME, TYPE_FRAME, TYPE_FRAME, TYPE_FRAME, TYPE_FRAME},
		Value:   75,
		WinType: WIN_REGULAR,
	},
}
