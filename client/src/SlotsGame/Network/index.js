class NetworkManager {
  // async requestSignUp (email, password, firstname, lastname) {
  //   const response = await fetch(process.env.URL_SIGNUP, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //     body: JSON.stringify({ email, password, firstname, lastname })
  //   })

  //   return await response.json()
  // }

  // async requestLogin (email, password) {
  //   const response = await fetch(process.env.URL_LOGIN, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //     body: JSON.stringify({ email, password })
  //   })

  //   if (response.ok) {
  //     const data = await response.json()
  //     return { authorized: true, data }
  //   }

  //   return { authorized: false, data: undefined }
  // }

  async requestSpin (bet) {
    return new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_URL_SPIN, {
        // Allows client to send the HttpOnly cookie
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bet })
      })
        .then((json) => json.json())
        .then(({ success, error, data }) => {
          console.log('/spin server response', { success, error, data })
          if (success) {
            const results = {
              spinResults: data.reels,
              spinValue: data.value,
              newTotal: data.newtotal,
              paylines: data.paylines,
              freeSpins: data.freespins,
            }
            resolve(results)
          } else {
            console.error('Error from /spin response!', error)
            reject(error)
          }
        })
    })
  }

  getCurrentState () {
    return this.mockGetCurrentStateRequest()
  }

  mockGetCurrentStateRequest () {
    return new Promise((resolve) => {
      const results = { bet: 30, total: 1000 }
      resolve(results)
    })
  }
}

export default NetworkManager
