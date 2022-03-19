import React from 'react'
import Screen from 'component/Screen'
import Header from './Header'
import styled from 'styled-components'
import AppName from './AppName'
import Column from 'component/Column'
import InviteMenu from './InviteMenu'
import LearnMore from './LearnMore'
import Row from 'component/Row'
import Features from './Features'
import FeatureCard from 'component/FeatureCard'

const LandingScreen = () => {
  return (
    <Screen>
        <Stage>
          <Header/>
          <ContentColumn>
            <StyledAppName/>
            <InviteMenu/>
          </ContentColumn>
          <LearnMore/>
          {/* {"test\n".repeat(10000)} */}
        </Stage>
        <Stage>
          <StyledRow>
            <StageHeaderText>ROSCO is jam-packed with several modules to help manage, moderate, and engage your community.</StageHeaderText>
          </StyledRow>
          <FeatureCardRow>
          {
            Features.map((f) => {
              return <FeatureCard
                {...f}
              />
            })
          }
          </FeatureCardRow>
          <AndMoreText>and more to come.</AndMoreText>
        </Stage>
    </Screen>
  )
}

const Stage = styled(Column)`
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const ContentColumn = styled(Column)`
  width: 100%;
  align-items: center;
`;

const StyledAppName = styled(AppName)`

`;

const StyledRow = styled(Row)`
  max-width: 90%;
`;

const StageHeaderText = styled.h2`
  font-weight: normal;
  font-size: 3.75em;
  padding-left: .2em;
`;

const FeatureCardRow = styled(Row)`
  justify-content: center;
  width: 90%;
  flex-wrap: wrap;
`;

const AndMoreText = styled.text`
  font-size: 2em;
  margin-bottom: 1em;
`;

export default LandingScreen