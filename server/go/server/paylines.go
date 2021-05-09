package server

type PayLine [5]int

var PayLines = []PayLine{
	// 1. Straight - top
	{0, 0, 0, 0, 0},
	// 2. Straight - middle
	{1, 1, 1, 1, 1},
	// 3. Straight - bottom
	{2, 2, 2, 2, 2},
	// 4. Normal V
	{0, 1, 2, 1, 0},
	// 5. Upside Down V
	{2, 1, 0, 1, 2},
	// 6. High Hole
	{0, 0, 1, 0, 0},
	// 7. Low Spike
	{2, 2, 1, 2, 2},
	// 8. Heart Beat
	{1, 0, 1, 2, 1},
	// 9. Reverse Heart Beat
	{1, 2, 1, 0, 1},
	// 10. Upside Down Bowl
	{1, 0, 0, 0, 1},
	// 11. Normal Bowl
	{1, 2, 2, 2, 1},
	// 12. Shallow Bowl
	{0, 1, 1, 1, 0},
	// 13. Upside Down Shallow Bowl
	{2, 1, 1, 1, 2},
	// 14. Lowercase w high
	{0, 1, 0, 1, 0},
	// 15. Lowercase m low
	{2, 1, 2, 1, 2},
	// 16. Lowercase m high
	{1, 0, 1, 0, 1},
	// 17. Lowercase w low
	{1, 2, 1, 2, 1},
	// 18. High Spike
	{1, 1, 0, 1, 1},
	// 19. Low Hole
	{1, 1, 2, 1, 1},
	// 20. Capital W
	{0, 2, 0, 2, 0},
	// 21. Two Spikes
	{2, 0, 2, 0, 2},
	// 22. Valley
	{1, 0, 2, 0, 1},
	// 23. Peak
	{1, 2, 0, 2, 1},
	// 24. Z
	{0, 0, 1, 2, 2},
	// 25. Reverse Z
	{2, 2, 1, 0, 0},
	// 26. Brief Dip
	{0, 0, 2, 0, 0},
	// 27. Brief Spike
	{2, 2, 0, 2, 2},
	// 28. Box
	{0, 2, 2, 2, 0},
	// 29. Table
	{2, 0, 0, 0, 2},
	// 30. Big M
	{2, 0, 1, 2, 0},
}
