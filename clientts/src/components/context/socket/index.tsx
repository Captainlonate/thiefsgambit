import React, { createContext } from 'react'
import { IChatSocketConnection } from './socketConnection'

export const SocketContext = createContext<IChatSocketConnection | null>(null)

interface ISocketProviderProps {
  children: React.ReactNode
  initialValue: IChatSocketConnection
}

export const SocketProvider = ({
  children,
  initialValue,
}: ISocketProviderProps) => {
  return (
    <SocketContext.Provider value={initialValue}>
      {children}
    </SocketContext.Provider>
  )
}
