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
import Stage from './Stage'
import FeatureCardStage from './FeatureCardStage'
import QuestionsStage from './QuestionsStage'

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
        <QuestionsStage/>
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