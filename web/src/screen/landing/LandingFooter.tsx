import Row from 'component/Row';
import React from 'react'
import { FaDiscord, FaRedditAlien, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import HeaderNavLink from './HeaderNavLink';

const LandingFooter = () => {
  return (
      <Container>
          <RedditIcon onClick={() => window.open("https://reddit.com/r/roscobot", "_blank")}/>
          {/* <TwitterIcon/> */}
          <DiscordIcon onClick={() => window.open("https://discord.gg/Ax9ZsdawMb", "_blank")}/>
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
    cursor: pointer;

    :hover {
        color: #c4c4c4;
    }
`;

const TwitterIcon = styled(FaTwitter)`
    margin: .25em;
    font-size: 2.5em;
    cursor: pointer;

    :hover {
        color: #c4c4c4;
    }
`;

const DiscordIcon = styled(FaDiscord)`
    margin: .25em;
    margin-top: .5em;
    font-size: 2.5em;
    cursor: pointer;

    :hover {
        color: #c4c4c4;
    }
`;

export default LandingFooter;