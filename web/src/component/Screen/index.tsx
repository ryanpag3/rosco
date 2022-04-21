import React from 'react'
import styled from 'styled-components'
import Colors from 'util/colors';

const Screen = (props: any) => {
  return (
    <Container {...props}>{props.children}</Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${Colors.BACKGROUND_DARK};
    min-height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
`;

export default Screen