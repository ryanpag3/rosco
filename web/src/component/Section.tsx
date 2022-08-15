import React from 'react'
import styled from 'styled-components';
import Colors from 'util/colors';
import Column from './Column';

const Section = (props: {
    title: string;
    description: string|undefined;
}|any) => {
  return (
      <Container {...props}>
          <Title>{props.title}</Title>
          {
              props.description &&
              <Description>{props.description}</Description>
          }
          {props.children}
      </Container>
  )
}

const Container = styled(Column)`
    margin: 1em;
    padding: 1.25em 1.25em 2em 1.25em;
    background-color: ${Colors.BACKGROUND_MEDIUM};
`;

const Title = styled.h2`
    margin-top: 0;
    margin-bottom: .5em;
    color: ${Colors.TEXT_LIGHT};
`;

const Description = styled.span`
    margin: 0 0 1em 0;
`;

export default Section