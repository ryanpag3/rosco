import Screen from 'component/Screen'
import { SelectedServerContext } from 'context/selected-server-context'
import React from 'react'
import styled from 'styled-components'
import PermissionTable from './PermissionTable'

const Permissions = () => {
  return (
    <StyledScreen>
      <SelectedServerContext.Consumer>
        {
          ({ server }) => (
            <PermissionTable server={server}/>
          )
        }
      </SelectedServerContext.Consumer>
    </StyledScreen>
  )
}

const StyledScreen = styled(Screen)`

`;

export default Permissions