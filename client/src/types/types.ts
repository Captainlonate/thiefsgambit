import * as PIXI from 'pixi.js'

export interface LoadAddOption {
  name: string,
  url: string
}

export interface XYCoord {
  x: number,
  y: number
}

export type StringObject = { [key: string]: string | undefined }

export type PIXIResource = {[index: string]: PIXI.ILoaderResource}

export type slotsGrid = string[][]

export interface SpinResults {
  spinResults: slotsGrid,
  spinValue: number,
  newTotal: number
}

export interface CurrentStateResults {
  bet: number,
  total: number
}

// export interface HTTPSpinResponse {

// }