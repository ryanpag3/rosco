import React from 'react'
import Screen from 'component/Screen'
import Header from './Header'
import styled from 'styled-components'
import AppName from './AppName'
import Column from 'component/Column'
import InviteMenu from './InviteMenu'
import LearnMore from './LearnMore'
import Stage from './Stage'
import FeatureCardStage from './FeatureCardStage'
import CommunityStage from './CommunityStage'
import LandingFooter from './LandingFooter'

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
        </Stage>
        <FeatureCardStage/>
        <CommunityStage/>
        <LandingFooter/>
    </Screen>
  )
}



const ContentColumn = styled(Column)`
  width: 100%;
  align-items: center;
`;

const StyledAppName = styled(AppName)`

`;

export default LandingScreen