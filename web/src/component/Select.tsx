import React from 'react'
import ReactSelect, { Props } from 'react-select'
import styled from 'styled-components'
import Column from './Column'
import SelectStyle from './SelectStyle'

const Select = (props: Props) => {
  return (
    <Container>
      <ReactSelect
        {...props}
        styles={{ ...SelectStyle, ...props.styles }}
      />
    </Container>
  )
}

const Container = styled(Column)`

`;

export default Select