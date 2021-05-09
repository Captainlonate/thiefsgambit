class NetworkManager {
  constructor () {

  }

  requestSpin ({ bet } = {}) {
    return this.mockSpinRequest()
  }

  getCurrentState () {
    return this.mockGetCurrentStateRequest()
  }

  mockSpinRequest () {
    return new Promise((resolve, reject) => {
      resolve({
        spinResults: [
          ['treasureMap', 'anchor', 'compass'], // Reel 1
          ['treasureMap', 'anchor', 'compass'], // Reel 2
          ['treasureMap', 'anchor', 'compass'], // Reel 3
          ['treasureMap', 'anchor', 'compass'], // Reel 4
          ['treasureMap', 'anchor', 'compass'] // Reel 5
        ],
        spinValue: 200,
        newTotal: Math.floor(Math.random() * 1000)
      })
    })
  }

  mockGetCurrentStateRequest () {
    return new Promise((resolve, reject) => {
      resolve({
        bet: 30,
        total: 1000
      })
    })
  }

  realSpinRequest () {

  }
}

export default NetworkManager
