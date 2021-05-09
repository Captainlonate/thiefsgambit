package server

type SpinResultResponse struct {
	Reels     Board
	Value     int
	NewTotal  int
	PayLines  []PayLine
	FreeSpins int
}
