import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const gameApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_GAME,
})

export const chatApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_SOCKETIO,
})
