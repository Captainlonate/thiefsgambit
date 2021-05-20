import React, { createContext, useContext } from 'react'
import socketIOClient from 'socket.io-client'

export const socketConnection = socketIOClient(process.env.REACT_APP_URL_SOCKETIO, {
  withCredentials: true
})

export const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

export const SocketProvider = ({ children, initialValue }) => {
  return (
    <SocketContext.Provider value={initialValue}>
      {children}
    </SocketContext.Provider>
  )
}