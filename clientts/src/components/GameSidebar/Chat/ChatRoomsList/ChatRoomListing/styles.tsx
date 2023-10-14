import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

export const ChatRoomName = styled.h3`
  margin: 0;
  font-size: 1.75em;
  font-weight: normal;
`

export const JoinIconStyles = styled.div`
  color: white;
  transition: color 0.25s linear;

  & > svg {
    font-size: 1.5em;
  }
`

export const JoinIcon = () => (
  <JoinIconStyles>
    <FontAwesomeIcon icon={faDoorOpen} />
  </JoinIconStyles>
)

export const ListingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 1.25em 1em;
  margin-bottom: 1.5em;
  border-radius: 5px;
  background-color: #185977;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    background-color: #cebb00;
    color: #0f3b50;
    transform: scale(1.1);
    ${JoinIconStyles} {
      color: #0f3b50;
    }
  }
`
