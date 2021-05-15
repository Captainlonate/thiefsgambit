import styled from 'styled-components'

export const HomePageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #292d33;
  display: flex;
  flex-direction: column;
  font-family: freebooter_updated;
  font-size: 16px;
  overflow: hidden;
`

export const TopBar = styled.div`
  background-color: white;
  width: 100%;
  height: 3em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  box-sizing: border-box;
`

export const HeroContainer = styled.div`
  background-color: #147500;
  width: 100%;
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SplitContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  color: #aa8200;
`

export const SplitSection = styled.div`
  flex: 1;
  padding: 1em;
`

export const SectionHeader = styled.h1`
  margin-top: 0;
  text-align: center;
  display: block;
`