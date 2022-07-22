import AutoModScreen from 'component/AutoModScreen';
import { SelectedServerContext } from 'context/selected-server-context'
import React from 'react'
import styled from 'styled-components';
import * as AutoModApi from 'api/automod';
import Section from 'component/Section';
import AllowedLinksInput from './AllowedLinksInput';

const index = () => {
  return (
    <SelectedServerContext.Consumer>
        {
            ({ server }: any) => (
                <StyledAutoModScreen
                    moduleName="Link Detection"
                    server={server}
                    isToggled={server.autoModLinkDetectEnabled}
                    onToggle={(isToggled: boolean) => {
                        return AutoModApi.toggleModule(server.id, 'link-detect', isToggled).then()
                    }}
                >
                    <StyledSection>
                        <AllowedLinksInput
                          server={server}
                        />
                    </StyledSection>
                </StyledAutoModScreen>                
            )
        }
    </SelectedServerContext.Consumer>
  )
}

const StyledAutoModScreen = styled(AutoModScreen)`

`;

const StyledSection = styled(Section)`
  max-width: 30em;
`;

export default index