import React, { useEffect } from 'react'
import AutoModScreen from 'component/AutoModScreen'
import styled from 'styled-components';
import * as AutoModApi from 'api/automod';
import { SelectedServerContext } from 'context/selected-server-context';

const BannedWords = (props: any) => {

  return (
    <SelectedServerContext.Consumer>
      {
        ({ server }: any) => (<StyledAutoModScreen
          moduleName="Banned Words"
          onToggle={(isToggled: boolean) =>{ 
                      console.log(server);
                      return AutoModApi.toggleBannedWords(server.id, isToggled).then()}
                    }
        >
        </StyledAutoModScreen>)
      }
    </SelectedServerContext.Consumer>
  )
}

const StyledAutoModScreen = styled(AutoModScreen)`

`;

export default BannedWords