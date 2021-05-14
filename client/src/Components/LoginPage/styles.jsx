import styled, { keyframes, css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #292d33;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: freebooter_updated;
`

export const LoginTitle = styled.h1`
  margin: 0 0 0.5em;
  text-align: center;
`

export const LoginBox = styled.div`
  font-size: 32px;
  padding: 1em;
  color: #caa753;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ disappear }) => (disappear) ? FadeOutAnimation : ''}
  max-width: 15em;
`

export const InputContainer = styled.div`
  padding: .5em 0;
  text-align: ${({ center }) => center ? 'center' : 'left'};
  width: 80%;
`

export const InputLabel = styled.label`
  display: block;
  font-size: 1em;
`

export const StyledTextInput = styled.input`
  font-family: freebooter_updated;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #79451a;
  background-color: transparent;
  color: #caa753;
  width: 100%;
  font-size: 0.75em;
`

export const LogInButton = styled.button`
  background-color: #55ca53;
  color: #292d33;
  border: 0;
  padding: 0.5em 1em;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  font-family: freebooter_updated;
  font-size: 0.75em;

  &:hover {
    background-color: #47a445;
  }

  &:disabled {
    background-color: #575757;
    cursor: wait;
    opacity: 0.5;
  }
`

export const FadeOut = keyframes`
  from {
    opacity: 1.0;
  }
  to {
    opacity: 0.0;
  }
`

export const FadeOutAnimation = css`
  animation: ${FadeOut} 2s linear;
  animation-fill-mode: forwards;
`

export const ErrorMessages = styled.div`
  padding: 0.75em 0;
  text-align: center;
  color: #e35050;
  font-size: 0.8em;
  width: 80%;
`
