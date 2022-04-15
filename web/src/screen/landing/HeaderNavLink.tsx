import React from 'react'
import { Link as RRLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderNavLink = (props: {
    to: string;
} & any) => {
  return (
    <Link to={props.to} {...props}>
        <StyledText>{props.children}</StyledText>
    </Link>
  )
}

const StyledText = styled.span`
    text-transform: uppercase;
    font-size: .9em;

    :hover {
      color: #c4c4c4;
    }
`;

const Link = styled(RRLink)`
    color: white;
    text-decoration: none;
    margin: 1em;
`;

export default HeaderNavLink;