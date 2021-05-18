import styled from 'styled-components'

export const CloseButtonStyles = styled.div`
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
