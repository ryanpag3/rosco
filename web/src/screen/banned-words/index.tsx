import React, { useEffect } from 'react'
import AutoModScreen from 'component/AutoModScreen'
import styled from 'styled-components';
import * as AutoModApi from 'api/automod';
import { SelectedServerContext } from 'context/selected-server-context';
import SetBannedWordsInput from './SetBannedWordsInput';
import Section from 'component/Section';

const BannedWords = (props: any) => {

  return (
    <SelectedServerContext.Consumer>
      {
        ({ server }: any) => (
          <StyledAutoModScreen
            moduleName="Banned Words"
            server={server}
            isToggled={server.autoModBannedWordsEnabled}
            onToggle={(isToggled: boolean) => {
              return AutoModApi.toggleModule(server.id, 'banned-words', isToggled).then()
            }}>

              <StyledSection
                description="Add values here to ban words in your server."
              >
                <SetBannedWordsInput
                server={server}
                />  
              </StyledSection>
          </StyledAutoModScreen>)
      }
    </SelectedServerContext.Consumer>
  )
}

const StyledAutoModScreen = styled(AutoModScreen)`

`;

const StyledSection = styled(Section)`
  max-width: 30em;
`;

export default BannedWords