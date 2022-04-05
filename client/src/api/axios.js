import axios from "axios"

export const gameApi = axios.create({
  baseURL: process.env.REACT_APP_URL_GAME
})

export const chatApi = axios.create({
  baseURL: process.env.REACT_APP_URL_SOCKETIO
})