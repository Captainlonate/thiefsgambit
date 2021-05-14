import { StandardApiResponse } from './common'

export interface SignInVerdict {
  authorized: boolean,
  errorMessageToDisplay?: string,
  data?: StandardApiResponse
}

export interface SignInArgs {
  email: string,
  password: string,
}

export const TryToSignIn = async ({ email, password }: SignInArgs): Promise<SignInVerdict> => {
  const verdict: SignInVerdict = {
    authorized: false,
    errorMessageToDisplay: '',
    data: undefined
  }

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const { success, error }: StandardApiResponse = await response.json()
      verdict.authorized = success
      if (error) {
        console.log('Authentication Error:', error)
        if (error.human_msg) {
          verdict.errorMessageToDisplay = error.human_msg
        } else {
          verdict.errorMessageToDisplay = 'Failed to log in.'
        }
      }
    } else {
      console.log('The server is not responding.')
      verdict.errorMessageToDisplay = 'Something is wrong. Try again later.'
    }
  } catch (ex) {
    console.log('Exception with logging in', ex)
    verdict.errorMessageToDisplay = 'Our carrier pidgeon has not returned. Try again later (with a new pidgeon).'
  }

  return verdict
}
