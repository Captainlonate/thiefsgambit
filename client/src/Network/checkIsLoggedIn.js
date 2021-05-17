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