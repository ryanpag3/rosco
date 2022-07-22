import React from 'react';
import Row from 'component/Row';
import styled from 'styled-components';
import ServerSelect from './ServerSelect';
import Colors from 'util/colors';
import logo from './android-chrome-192x192.png';
import Button from 'component/Button';
import { FiLogOut } from 'react-icons/fi';
import * as AuthApi from 'api/auth';
import { useNavigate } from 'react-router-dom';

const ScreenTopBar = (props: {
    me: {
        username: string;
    }
}) => {
    const navigate = useNavigate();

    const logout = async () => {
        await AuthApi.logout();
        navigate('/', {
            replace: true
        });
    }

    return (
        <Container>
            <Logo src={logo} />
            <ServerSelect />
            <PushToRight />
            <UserTag>{props.me.username}</UserTag>
            <LogoutButton
                onClick={logout}
            ><LogoutIcon />&nbsp;logout</LogoutButton>
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
    font-size: .95em;
`;

const Logo = styled.img`
    width: 2.25em;
`;

const PushToRight = styled(Row)`
    flex-grow: 1;
`;

const UserTag = styled.span`

`;

const LogoutIcon = styled(FiLogOut)`
    color: ${Colors.TEXT_MEDIUM};
`;

const LogoutButton = styled(Button)`
    background: none;
    color: ${Colors.TEXT_LIGHT};
    margin-left: 1em;
`;

export default ScreenTopBar