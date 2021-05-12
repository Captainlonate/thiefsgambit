# Thief's Gambit - API

#### TODO:
- Spin
  - Spin should check if board awarded free spins
  - Deal with bets
    - 1 per line (30)
    - 2 per line (60)
    - 3 per line (90)
  - Spin should check if currently HAS any free spins
    - If no free spins, Spin should reduce total money
    - Otherwise, should reduce free spin count by 1
  - Spin should check if enough money to even make the spin
- Chat
- Friends
  - Option 1) Need Friendship Table
    - User 1 uint, User 2 uint
  - Option 2) User can only have 2 friends, and are attached to User table
  