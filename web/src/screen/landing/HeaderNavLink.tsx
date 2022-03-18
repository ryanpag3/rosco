import React from 'react'
import { Link as RRLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderNavLink = (props: {
    to: string;
} & any) => {
  return (
    <Link to={props.to}>
        <StyledText>{props.children}</StyledText>
    </Link>
  )
}

const StyledText = styled.text`
    text-transform: uppercase;
    font-size: .9em;
`;

const Link = styled(RRLink)`
    color: white;
    text-decoration: none;
    margin: 1em;
`;

export default HeaderNavLink;