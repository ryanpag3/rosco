import React from 'react'
import styled from 'styled-components';

const AppName = (props: any) => {
  return (
      <Container {...props}>
          <Name>ROSCO</Name>
      </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.h1`
    font-size: 4.5em;
    font-weight: 50;
    letter-spacing: .4em;
`;

export default AppName;