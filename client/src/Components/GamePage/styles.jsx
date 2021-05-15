import styled from 'styled-components'

export const GamePageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #292d33;
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; */
  font-family: freebooter_updated;
  overflow: hidden;
  display: flex;
`

export const GameAndMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
`

export const MenuContainer = styled.div`
  width: ${({ open }) => open ? '10em' : '5em'};
  background-color: pink;
  display: flex;
`

export const Menu = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

export const MenuItem = styled.div`
  box-sizing: border-box;
  padding: 0.5em;
`

export const GameContainer = styled.div`
  flex: 1;
  background-color: coral;
  padding: 0;
  border: 0;
  overflow: hidden;

  /* & > canvas {
    max-width: 100%;
    max-height: 100%;
  } */
`