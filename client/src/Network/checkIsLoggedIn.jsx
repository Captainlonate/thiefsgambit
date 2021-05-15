import React, { useState, useEffect } from 'react'

export const CheckIsLoggedIn = async () => {
  const response = await window.fetch(process.env.REACT_APP_URL_ISLOGGEDIN, {
    method: 'GET',
    credentials: 'include'
  })

  if (response.ok) {
    const { success } = await response.json()
    return success
  }

  console.error('CheckIsLoggedIn: Response was not ok. Something is wrong.')
  return false
}

/*
  Higher Order Component that wraps another component and provides
  it with:
    1) isLoggedIn - boolean
    2) isLoading - boolean if currently doing a network fetch
    3) reCheckLoggedIn - Function that do another network call
      to check again.
*/
export const withIsLoggedIn = (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithLoggedIn = (props) => {
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
        {...props}
      />
    )
  }

  ComponentWithLoggedIn.displayName = `withIsLoggedIn(${displayName})`

  return ComponentWithLoggedIn
}
