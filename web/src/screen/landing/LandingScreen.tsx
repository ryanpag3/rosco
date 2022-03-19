import React from 'react'
import Screen from 'component/Screen'
import Header from './Header'
import styled from 'styled-components'
import AppName from './AppName'
import Column from 'component/Column'
import InviteMenu from './InviteMenu'

const LandingScreen = () => {
  return (
    <Screen>
        <Header/>
        <ContentColumn>
          <StyledAppName/>
          <InviteMenu/>
        </ContentColumn>
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