import {
  HomePageWrapper,
  TopBar,
  HeroContainer,
  SplitContainer,
  SplitSection,
  SectionHeader,
} from './styles'

const HomePage = () => {

  return (
    <HomePageWrapper>
      <TopBar>
        <div>Thief's Gambit</div>
        <div>Your Account</div>
      </TopBar>
      <HeroContainer>
        <div>PLAY NOW</div>
      </HeroContainer>
      <SplitContainer>
        <SplitSection>
          <SectionHeader>Friends</SectionHeader>
          <div>
            <p>Search For Friends</p>
            <input type='text' placeholder='username' />
            <button>Search</button>
            <div>
              <p>Search results</p>
              <ul>
                <li>( ) Person 1</li>
                <li>( ) Person 2</li>
              </ul>
            </div>
          </div>
          <div>
            <p>Your Friends</p>
            <ul>
              <li>Friend 1</li>
              <li>Friend 2</li>
              <li>Friend 3</li>
            </ul>
          </div>
        </SplitSection>
        <SplitSection>
          <SectionHeader>Global Chat</SectionHeader>
          <div>...</div>
        </SplitSection>
      </SplitContainer>
    </HomePageWrapper>
  )
}

export default HomePage
