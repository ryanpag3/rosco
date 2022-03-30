import React from 'react'
import Button from 'component/Button';
import Column from 'component/Column';
import styled from 'styled-components';
import { FaDiscord } from 'react-icons/fa';

const InviteMenu = () => {
  return (
    <Container>
        <StyledInviteButton
            onClick={() => window.open("https://discord.com/oauth2/authorize?client_id=955851785346613248&scope=bot%20applications.commands&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Froscobot.com", "_blank")}
        >
            Invite to &nbsp;<DiscordIcon/>   
        </StyledInviteButton>
        <TryItYourselfAnchor
            onClick={() => window.open("https://discord.gg/YVcXfJWEhA", "_blank")}
        >Or try it yourself first</TryItYourselfAnchor>
    </Container>
  )
}

const Container = styled(Column)`
    align-items: center;
    margin-top: 7em;

    @media (max-width:500px) {
      margin-top: 3em;
    }
`;

const StyledInviteButtonProps: any = {
    horizPadding: '1.8em'
};

const StyledInviteButton = styled(Button)`
    font-size: 1.3em;
    background-color: #A3DCEE;
    color: black;
    padding-left: ${StyledInviteButtonProps.horizPadding};
    padding-right: ${StyledInviteButtonProps.horizPadding};

    :hover {
        background-color: #bef0ff;
        cursor: pointer; 
    }
`;

const DiscordIcon = styled(FaDiscord)`
    font-size: 2em;
`;

const TryItYourselfAnchor = styled.a`
    margin-top: 1em;

    :hover {
        cursor: pointer;
    }
`;

export default InviteMenu;