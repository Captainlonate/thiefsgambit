import styled from 'styled-components'

const PageWrapper = styled.div`
  background-color: #292d33;
  width: 100vw;
  height: 100vh;
  color: white;
  font-size: 4em;
  font-family: freebooter_updated;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const LoadingPage = ({ text }) => {
  return (
    <PageWrapper>{text}</PageWrapper>
  )
}

export default LoadingPage
