import Button from 'component/Button';
import { FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';

const InviteButton = (props: any) => {
    return (
    <StyledInviteButton
        onClick={() => window.open("https://discord.com/oauth2/authorize?client_id=955851785346613248&scope=bot%20applications.commands&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Froscobot.com", "_blank")}
        {...props}
    >
        Invite to &nbsp;<DiscordIcon/>   
    </StyledInviteButton>
    )
};

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

export default InviteButton;