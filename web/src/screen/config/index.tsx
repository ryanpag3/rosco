import Screen from 'component/Screen'
import Section from 'component/Section'
import { SelectedServerContext } from 'context/selected-server-context'
import React from 'react'
import styled from 'styled-components'
import Timezone from './Timezone'

const Config = () => {
  return (
    <StyledScreen>
      <SelectedServerContext.Consumer>
        {
          ({ server }) => {
            return <Timezone server={server}/>
          }
        }
      </SelectedServerContext.Consumer>
      
    </StyledScreen>
  )
}

const StyledScreen = styled(Screen)`

`;

export default Config