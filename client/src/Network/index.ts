import { SpinResults, CurrentStateResults } from '../types/types'

class NetworkManager {
  requestSpin (): Promise<SpinResults> {
    return this.mockSpinRequest()
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

  realSpinRequest () {

  }
}

export default NetworkManager
