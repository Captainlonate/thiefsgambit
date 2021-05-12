import { SpinResults, CurrentStateResults } from '../types/types'

const URL_LOGIN = 'http://localhost:3001/login'
const URL_SPIN = 'http://localhost:3001/spin'
const URL_SIGNUP = 'http://localhost:3001/signup'

class NetworkManager {
  async login () {
    // const results = await this.requestSignUp('kathy@email.com', 'Slotsg@me', 'Kathy', 'Erwine')
    // console.log('r', results)
    const results = await this.requestLogin('kathy@email.com', 'Slotsg@me')
    console.log('r', results)
  }

  async requestSignUp (email: string, password: string, firstname: string, lastname: string) {
    const response = await fetch(URL_SIGNUP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, firstname, lastname })
    })

    return await response.json()
  }

  async requestLogin (email: string, password: string) {
    const response = await fetch(URL_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const data = await response.json()
      return { authorized: true, data }
    }

    return { authorized: false, data: undefined }
  }

  requestSpin (): Promise<SpinResults> {
    return this.realSpinRequest()
    // return this.mockSpinRequest()
  }

  getCurrentState (): Promise<CurrentStateResults> {
    return this.mockGetCurrentStateRequest()
  }

  mockSpinRequest (): Promise<SpinResults> {
    return new Promise((resolve) => {
      const results: SpinResults = {
        spinResults: [
          ['treasureMap', 'anchor', 'compass'], // Reel 1
          ['treasureMap', 'anchor', 'compass'], // Reel 2
          ['treasureMap', 'anchor', 'compass'], // Reel 3
          ['treasureMap', 'anchor', 'compass'], // Reel 4
          ['treasureMap', 'anchor', 'compass'] // Reel 5
        ],
        spinValue: 200,
        newTotal: Math.floor(Math.random() * 1000)
      }
      resolve(results)
    })
  }

  mockGetCurrentStateRequest (): Promise<CurrentStateResults> {
    return new Promise((resolve) => {
      const results: CurrentStateResults = {
        bet: 30,
        total: 1000
      }
      resolve(results)
    })
  }

  realSpinRequest (): Promise<SpinResults> {
    return new Promise((resolve, reject) => {
      fetch(URL_SPIN, {
        // Allows client to send the HttpOnly cookie
        credentials: 'include',
      })
        .then((json) => json.json())
        .then(({ success, error, data }) => {
          console.log('/spin server response', success, error, data)
          if (success) {
            const results: SpinResults = {
              spinResults: data.Reels,
              spinValue: data.Value,
              newTotal: data.NewTotal
            }
            resolve(results)
          } else {
            console.error('Error from /spin response!', error)
            reject(error)
          }
        })
    })
  }
}

export default NetworkManager
