import { useState, useContext } from 'react'
import { AuthContext } from '../context/auth'
import { SubmitCredentials, validateLoginForm } from './tools'
import {
  Wrapper,
  LoginTitle,
  LoginBox,
  InputContainer,
  InputLabel,
  StyledTextInput,
  LogInButton,
  ErrorMessages
} from './styles'

const LoginScreen = () => {
  const { loggedInState, updateLoggedIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fadeOut, setFadeOut] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [tryingToSignIn, setTryingToSignIn] = useState(false)

  const onSuccess = () => {
    setFadeOut(true)
    // There is a css fade out transition, before the redirect should happen
    setTimeout(() => {
      updateLoggedIn({
        ...loggedInState,
        isLoggedIn: true,
        loading: false,
        errorMessage: '',
      })
    }, 2000)
  }

  const onFailure = (errorMessage) => {
    errorMessage = errorMessage || "Something didn't work right."
    setErrorMessage(errorMessage)
    setTryingToSignIn(false)
  }

  const onClickLogIn = () => {
    if (!tryingToSignIn) {
      const validationMessage = validateLoginForm(email, password)
      if (validationMessage.length > 0) {
        setErrorMessage(validationMessage)
      } else {
        setTryingToSignIn(true)
        setErrorMessage('')
        SubmitCredentials({ email, password, onSuccess, onFailure })
      }
    }
  }

  // Form is only used to capture the 'Enter' key
  const onFormSubmit = (e) => {
    e.preventDefault()
    onClickLogIn()
  }

  return (
    <Wrapper>
      <LoginBox disappear={fadeOut} onSubmit={onFormSubmit}>
        <LoginTitle>Thief's Gambit</LoginTitle>
        <InputContainer>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <StyledTextInput id='email' type='text' value={email} name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value.toLowerCase())} />
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <StyledTextInput id='password' type='password' value={password} name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </InputContainer>

        {
          errorMessage
            ? (<ErrorMessages>{errorMessage.toString()}</ErrorMessages>)
            : null
        }

        <InputContainer center>
            <LogInButton onClick={onClickLogIn} disabled={tryingToSignIn}>LOG IN</LogInButton>
        </InputContainer>
      </LoginBox>
    </Wrapper>
  )
}

export default LoginScreen
