import styled from 'styled-components'

export const ClosedSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 0.5em;
  box-sizing: border-box;
`

export const SidebarItem = styled.div`
  width: 3em;
  height: 3em;
  background-color: #185977;
  color: #baffa4;
  border-radius: 5px;
  margin-bottom: 0.5em;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > svg {
    font-size: 1.75em;
  }
`
