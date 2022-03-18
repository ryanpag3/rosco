import React from 'react'
import styled from 'styled-components'

const Screen = (props: any) => {
  return (
    <Container {...props}>{props.children}</Container>
  )
}

const Container = styled.div`
    display: flex;
    background-color: #535353;
    min-height: 100%;
    width: 100%;
`;

export default Screen