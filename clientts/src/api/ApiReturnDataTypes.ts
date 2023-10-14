/**
 * ApiResponse.data for `/isLoggedIn`
 * (Returns no `data`. Just a success on the main object.)
 */
export type ApiResponseIsLoggedIn = null

export interface IApiResponseSpin {
  reels: string[][]
  value: number
  newtotal: number
  freespins: number
  paylines: number[][]
}

export interface IApiResponseCurrentState {
  totalcredits: number
  previousbet: number
  possiblebets: number[]
}

export interface IChatRoom {
  chatRoomId: string
  chatRoomName: string
}

export type IApiResponseRooms = IChatRoom[]

export interface IChatMessage {
  /**
   * Example: `'32'`
   */
  messageId: string
  /**
   * Example: `'2'`
   */
  authorId: string
  /**
   * Example: `'3'`
   */
  chatRoomId: string
  message: string
  /**
   * Example: `2021`-05-19T05:33:58.322Z
   */
  timestamp: string
  /**
   * Example: `ktell10`
   */
  authorUserName: string
  writtenByMe: boolean
}

export type IApiResponseRecentChatsForRoom = IChatMessage[]
