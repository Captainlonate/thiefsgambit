/*
  ###################################
  TODO:
    Move/Rebuild this into api/Api.js - GameAPI{}
  ###################################
*/
export const CheckIsLoggedIn = async () => {
  try {
    const response = await window.fetch(`${process.env.REACT_APP_URL_GAME}/isloggedin`, {
      method: 'GET',
      credentials: 'include'
    })
    
    if (response.ok) {
      const { success } = await response.json()
      return success
    }
    
    console.error('CheckIsLoggedIn: Response was not ok. Something is wrong.')
  } catch (ex) {
    console.log('Could not reach the server.', ex)
    throw new Error('Could not reach the server.')
  }

  return false
}
