import React from 'react';
import Row from 'component/Row';
import styled from 'styled-components';
import ServerSelect from './ServerSelect';
import Colors from 'util/colors';

const ScreenTopBar = (props: {
    me: {
        username: string;
    }
}) => {
  return (
      <Container>
          <Logo src={process.env.PUBLIC_URL + 'android-chrome-192x192.png'}/>
          <ServerSelect/>
          <PushToRight/>
          <UserTag>{props.me.username}</UserTag>
      </Container>
  )
}

const Container = styled(Row)`
    padding: 1em;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    min-height: 4.5em;
    background-color: ${Colors.BACKGROUND_DARKER};
`;

const Logo = styled.img`
    width: 2.25em;
`;

const PushToRight = styled(Row)`
    flex-grow: 1;
`;

const UserTag = styled.span`

`;

export default ScreenTopBar