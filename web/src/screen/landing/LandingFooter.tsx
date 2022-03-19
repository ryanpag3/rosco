import Row from 'component/Row';
import React from 'react'
import { FaDiscord, FaRedditAlien, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import HeaderNavLink from './HeaderNavLink';

const LandingFooter = () => {
  return (
      <Container>
          <RedditIcon/>
          <TwitterIcon/>
          <DiscordIcon/>
          <HeaderNavLink to="/privacy-policy">Privacy Policy</HeaderNavLink>
      </Container>
  )
}

const Container = styled(Row)`
    height: 4em;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const RedditIcon = styled(FaRedditAlien)`
    margin: .25em;
    font-size: 2.5em;
`;

const TwitterIcon = styled(FaTwitter)`
    margin: .25em;
    font-size: 2.5em;
`;

const DiscordIcon = styled(FaDiscord)`
    margin: .25em;
    font-size: 2.5em;
`;

export default LandingFooter;