import Screen from 'component/Screen'
import React from 'react'
import styled from 'styled-components'

const Home = () => {
  return (
    <StyledScreen>
      <WelcomeText>
        Welcome to the Rosco Web Dashboard!
        <br /><br />
      </WelcomeText>
      <SubText>
        Please use the navigation menu to the left to get started.
      </SubText>
    </StyledScreen>
  )
}

const StyledScreen = styled(Screen)`
  padding: 1em;
`;

const WelcomeText = styled.span`
  font-size: 2em;
  max-width: 25em;
`;

const SubText = styled.span`
  font-size: 1.5em;
`;

export default Home