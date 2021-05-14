import React, { FC, useState, useEffect } from 'react'
import { StandardApiResponse } from './common'

export const CheckIsLoggedIn = async (): Promise<boolean> => {
  const response = await fetch('http://localhost:3001/isloggedin', {
    method: 'GET',
    // headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    // body: JSON.stringify({ email, password })
  })

  if (response.ok) {
    const { success }: StandardApiResponse = await response.json()
    return success
  }
  
  console.error('CheckIsLoggedIn: Response was not ok. Something is wrong.')
  return false
}

export interface withIsLoggedInProps {
  loading: boolean
}

/*
  All of this unreadable and complicated code is the result of typescript.
  This is basically (without typescript):
    export function withIsLoggedIn = (WrappedComponent) => {
      return (props) => {
        return <WrappedComponent {...props} />
      }
    }
  But with the addition of the network fetching stuff.
*/
export function withIsLoggedIn<T extends withIsLoggedInProps = withIsLoggedInProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithLoggedIn = (props: Omit<T, keyof withIsLoggedInProps>) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const checkIfLoggedIn = async () => {
      setIsLoading(true)
      const answerIfLoggedIn = await CheckIsLoggedIn()
      console.log('answerIfLoggedIn', answerIfLoggedIn)
      setIsLoggedIn(answerIfLoggedIn)
      setIsLoading(false)
    }

    useEffect(() => {
      checkIfLoggedIn()
    }, [])

    return (
      <WrappedComponent
        refetch={checkIfLoggedIn}
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}
        {...(props as T)}
      />
    )
  }

  ComponentWithLoggedIn.displayName = `withIsLoggedIn(${displayName})`

  return ComponentWithLoggedIn
}