import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faTimesCircle, faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons'

export const ChatSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #0f3b50;
  color: #baffa4;
  font-family: freebooter_updated;
`

export const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  border-bottom: 2px solid #b8fda3;
`

export const SidebarHeader = ({ onBack, titleText, onOpenToggle }) => (
  <HeaderBar>
    {
      (typeof onBack === 'function') && <BackButton onClick={onBack} />
    }
    <HeaderText>{titleText}</HeaderText>
    {
      (typeof onOpenToggle === 'function') && <CloseButton onClick={onOpenToggle} />
    }
  </HeaderBar>
)

export const ChatSection = styled.div`
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  justify-content: end;
  font-size: 1.2em;
`

export const CloseButtonStyles = styled.div`
  border-radius: 50%;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.25s linear;
  & > svg {
    font-size: 2em;
  }
  &:hover {
    color: #b8fda3;
  }
`

export const CloseButton = ({ onClick }) => (
  <CloseButtonStyles onClick={onClick}>
    <FontAwesomeIcon icon={faTimesCircle} />
  </CloseButtonStyles>
)

export const HeaderText = styled.h5`
  margin: 0;
  font-size: 2em;
  letter-spacing: 1px;
`

export const BackButtonStyles = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  transition: color 0.25s linear;

  & > svg {
    font-size: 2.2em;
  }

  &:hover {
    color: #b8fda3;
  }
`

export const BackButton = ({ onClick }) => (
  <BackButtonStyles onClick={onClick}>
    <FontAwesomeIcon icon={faArrowCircleLeft} />
  </BackButtonStyles>
)

export const ChatMessage = styled.div`
  background-color: #185977;
  border-radius: 5px;
  color: white;
`

export const WordsWrapper = styled.div`
  &:not(:last-child) {
    padding-bottom: 0.25em;
  }
`

export const ChatMessageProfile = styled.div`
  font-size: 1.4em;
  padding-bottom: 0.25em;
`

export const Chat = styled.div`
  padding: 0.5em;
  
  ${({ them }) => {
    return them && 'text-align: right;'
  }}

  ${ChatMessage} {
    padding: 0.5em;
    ${({ them }) => {
      return them ? 'padding-right: 0.5em;' : 'padding-left: 0.5em;'
    }}
  }
`

export const InputSection = styled.div`
  height: 5em;
  background-color: #185977;
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  box-sizing: border-box;
`

export const InputSectionLeft = styled.div`
  flex: 1;
  box-sizing: border-box;
`

export const InputSectionRight = styled.div`
  width: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`

export const MessageTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  max-height: 10em;
  overflow-y: auto;
  border-radius: 5px;
  resize: none;
  padding: 0.25em;
  border: none;
  margin: 0;
  cursor: text;
  box-sizing: border-box;
  color: #185977;
  font-size: 1.25em;
  font-family: freebooter_updated;
`

export const SendMessageBtn = styled.button`
  width: 3em;
  height: 3em;
  background-color: #0f3b50;
  color: #baffa4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  & > span {
    font-size: 1.5em;
    font-weight: bold;
  }
`