import Button from 'component/Button';
import { FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';
import Colors from 'util/colors';
import InviteUrl from 'util/invite-url';

const InviteButton = (props: any) => {
    return (
    <StyledInviteButton
        onClick={() => window.open(InviteUrl, "_blank")}
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
    background-color: ${Colors.BUTTON_INVITE};
    color: ${Colors.TEXT_DARK};
    padding-left: ${StyledInviteButtonProps.horizPadding};
    padding-right: ${StyledInviteButtonProps.horizPadding};

    :hover {
        background-color: ${Colors.BUTTON_INVITE_HOVER};
        cursor: pointer; 
    }
`;

const DiscordIcon = styled(FaDiscord)`
    font-size: 2em;
`;

export default InviteButton;