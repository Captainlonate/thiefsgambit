import styled from 'styled-components'

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
