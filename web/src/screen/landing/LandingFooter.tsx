import Row from 'component/Row';
import React from 'react'
import { FaDiscord, FaRedditAlien, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import Colors from 'util/colors';
import CookieConsent from 'react-cookie-consent';
import HeaderNavLink from './HeaderNavLink';

const LandingFooter = () => {
  return (
      <Container>
          <RedditIcon onClick={() => window.open("https://reddit.com/r/roscobot", "_blank")}/>
          {/* <TwitterIcon/> */}
          <DiscordIcon onClick={() => window.open("https://discord.gg/Ax9ZsdawMb", "_blank")}/>
          <HeaderNavLink to="/privacy-policy">Privacy Policy</HeaderNavLink>
          {/* @ts-ignore */}
          <CookieConsent
            location="bottom"
            buttonText="I understand."
          >This website uses cookies for essential functionality. Click "I understand" to accept.</CookieConsent>
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
        color: ${Colors.TEXT_LIGHT_HOVER};
    }
`;

const TwitterIcon = styled(FaTwitter)`
    margin: .25em;
    font-size: 2.5em;
    cursor: pointer;

    :hover {
        color: ${Colors.TEXT_LIGHT_HOVER};
    }
`;

const DiscordIcon = styled(FaDiscord)`
    margin: .25em;
    margin-top: .5em;
    font-size: 2.5em;
    cursor: pointer;

    :hover {
        color: ${Colors.TEXT_LIGHT_HOVER};
    }
`;

export default LandingFooter;