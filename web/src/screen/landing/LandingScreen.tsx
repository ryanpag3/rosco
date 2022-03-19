import React from 'react'
import Screen from 'component/Screen'
import Header from './Header'
import styled from 'styled-components'
import AppName from './AppName'
import Column from 'component/Column'
import InviteMenu from './InviteMenu'
import LearnMore from './LearnMore'
import Row from 'component/Row'

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
        </Stage>
    </Screen>
  )
}

const Stage = styled.div`
  height: 100vh;
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
  padding-left: .3em;
`;

const StageHeaderTextEmphasized = styled(StageHeaderText)`
  font-weight: bold;
`;

export default LandingScreen