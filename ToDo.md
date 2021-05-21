--------------------------
----- Remaining TODO ----- 
--------------------------

---------
Server
---------

  GO
    Token needs to expire and that needs to be checked
    Need /getstate endpoint to get the players current game state at any point
      Should have coins, freespins, 

  NODE
    Need Chat API docker container and deployment
    Get rooms should only display elite or not elite.
      Elite members should not see common groups
  
  MISC
    Need remote script to execute for deployments
    Need docker container for NodeJS
    Need github clone added to server script
    Need certbot renew set up with cron and cp files
    Need better comments
    Lightsail backups?


---------
Client
---------

  Site
    Need Sign Up page (api is already written)

  Game
    Need get to make initial /getstate request
    Need to draw paylines with animation
    Need to make wheel spin during spin, but make wheel
      disabled during win (paylines)
    Need to draw emphasized glow and corners for winning pieces
    Need a UI to show all paylines
      Maybe click a button to show 30 different colored paylines?
    Need a UI to show values of matches
    Need some "Big Win" style of win text.
      When you win in 2-3 different amounts, you should get an exciting
      message or something over top.
    Need to decide how free spins will work
      * Want to use cheats, but maybe free spin pieces for now?
    When you win, total loot should count up to new value, not instantly change

  Art
    Only have 4 pieces, need minimum of 8
      Mug, Macaw, Treasure Chest
    Wheel does not spin
    Scene is very ugly.
      Make more real water
      Redo all the wood with cracks and textures
      Need shadows and better lighting
      Crate needs chips and texture
      Rope needs to look like rope
      Need some green somewhere
    Numbers float in mid air. Need something to attach them to.
    Numbers are a weird color (yellow/green)
    Game title needs to be on top wood
    Friends?
      Future feature for now...
    

