import React from 'react'
import styled from 'styled-components';
import HeaderNavLink from './HeaderNavLink';

const Header = () => {
    return (
        <Container>
            <EmptySpace />
            <HeaderNavLink to="/"
                onClick={() => window.open(process.env.REACT_APP_DOC_URL || 'https://wiki.roscobot.com')}
            >Documentation</HeaderNavLink>
            <HeaderNavLink to="/" rel="noopener noreferrer"
                onClick={() => window.open("https://discord.gg/Ax9ZsdawMb", "_blank")}
            >Support</HeaderNavLink>
            {/* <HeaderNavLink to="/status">Status</HeaderNavLink>
          <HeaderNavLink to="/roadmap">Roadmap</HeaderNavLink>*/}
          <HeaderNavLink to="/"
            onClick={() => window.open((process.env.REACT_APP_API_URL) + '/login', '_self')}
          >Login</HeaderNavLink> 
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 4em;
    align-items: center;
`;

const EmptySpace = styled.div`
    flex-grow: 1;
`;

export default Header;