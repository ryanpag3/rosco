import React from 'react';
import Row from 'component/Row';
import styled from 'styled-components';

const ScreenTopBar = (props: {
    me: {
        username: string;
    }
}) => {
  return (
      <Container>
          <UserTag>{props.me.username}</UserTag>
      </Container>
  )
}

const Container = styled(Row)`
    flex-wrap: wrap;
    position: absolute;
    width: 100%;
    min-height: 1.25em;
    background-color: black;
`;

const UserTag = styled.text`

`;

export default ScreenTopBar