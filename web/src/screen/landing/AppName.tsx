import React from 'react'
import styled from 'styled-components';
import Row from 'component/Row';

const AppName = (props: any) => {
  return (
      <Container {...props}>
          <Name>ROSCO</Name>
          <Row>
              <Byline>
                  A next-generation multipurpose&nbsp;
              </Byline>
              <BylineDiscord>Discord</BylineDiscord> 
              <Byline>
                &nbsp;bot.
              </Byline>
          </Row>
      </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Name = styled.h1`
    font-size: 4.5em;
    font-weight: 50;
    letter-spacing: .4em;
    margin-bottom: .1em;
`;

const Byline = styled.text`
    font-size: 2.25em;
    font-weight: regular;
`;

const BylineDiscord = styled(Byline)`
    color: #B7BDF8;
    font-weight: bold;
`;

export default AppName;