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
    overflow: hidden;
    background-color: ${Colors.BACKGROUND_DARK};
    min-height: 100%;
    max-width: 100%;
`;

export default Screen