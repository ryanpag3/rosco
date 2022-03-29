import React from 'react'
import styled from 'styled-components'

const Screen = (props: any) => {
  return (
    <Container {...props}>{props.children}</Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-left: .5em;
    padding-right: .5em;
    background-color: #535353;
    min-height: 100%;
    max-width: 100%;
`;

export default Screen