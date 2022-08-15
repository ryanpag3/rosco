import Screen from 'component/Screen';
import React from 'react'
import styled from 'styled-components';

const NotFound = () => {
  return (
    <StyledScreen>
        <Image src="https://i.imgur.com/ApjVnee.mp4" autoPlay loop muted/>
        <Text>404 - Not found!</Text>
        <SmallText>Are you lost? 😅</SmallText>
    </StyledScreen>
  )
}

const StyledScreen = styled(Screen)`
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
`;

const Image = styled.video`
    width: 400px;
`;

const Text = styled.h1`

`;

const SmallText = styled.h4`

`;

export default NotFound;