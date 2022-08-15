import Screen from 'component/Screen';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const InternalError = () => {
  const defaultSecondsLeft = 10;
  const [secondsLeft, setSecondsLeft] = useState(defaultSecondsLeft);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate('/');
    }
  }, [secondsLeft]);

  return (
    <StyledScreen>
      <Image src="https://i.imgur.com/Br00TCn.mp4" autoPlay loop muted />
      <Text>Something broke really bad :(</Text>
      <SmallText>We will send you back home in {secondsLeft} seconds.</SmallText>
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

export default InternalError;