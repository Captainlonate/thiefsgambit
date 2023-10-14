import * as PIXI from 'pixi.js'

// Text font styles for money (total, bet, winnings) as
// it appears in the game screen
export const baseMoneyStyles: Partial<PIXI.ITextStyle> = {
  fontFamily: 'pirate_font',
  fontSize: 38,
  fill: ['#ffff00', '#59c995'],
  stroke: '#4a1850',
  strokeThickness: 4,
  letterSpacing: 3,
}
