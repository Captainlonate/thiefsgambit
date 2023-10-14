import styled from 'styled-components'

export const GameSidebarWrapper = styled.div<{ $open: boolean }>`
  width: ${({ $open }) => ($open ? '25em' : '5em')};
  background-color: #0f3b50;
  display: flex;
`
