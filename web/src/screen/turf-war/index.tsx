import Screen from 'component/Screen'
import React from 'react'
import styled from 'styled-components'
import Grid from './Grid'

const Turfwar = () => {
  return (
    <StyledScreen>
        <Grid/>
    </StyledScreen>
  )
}

const StyledScreen = styled(Screen)`

`;

export default Turfwar