import { TryToSignIn } from '../../Network/login'
import { validateEmail } from '../../utils'

/*
  Invoked when the user is ready to submit their credentials
  to the server in an attempt to Sign In and get their JWT.
*/
export const SubmitCredentials = async ({ email, password, onSuccess, onFailure }) => {
  email = email.trim().toLowerCase()
  password = password.trim()
  const verdict = await TryToSignIn({ email, password })
  if (verdict.authorized) {
    onSuccess()
  } else {
    onFailure(verdict.errorMessageToDisplay || '')
  }
}

/*
  Just check the email and password to make sure they seem viable.
  It's not a comprehensive check, but it'll rule out
  90% of the dumb cases.
*/
export const validateLoginForm = (email, password) => {
  if (password.length === 0) {
    return 'You\'ll need a key to access yer treasure.'
  }

  if (email.length === 0) {
    return 'No e-mail? It\'s much faster than sea mail.'
  }

  if (password.length < 8) {
    return 'You won\'t fool anyone with a short password.'
  }

  if (!validateEmail(email)) {
    return 'What kind of email is that?'
  }

  return ''
}
