import Column from 'component/Column'
import Screen from 'component/Screen'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const NavSideBar = () => {
    const navigate = useNavigate();

  return (
    <Container>
        <StyledLink to="home">Home</StyledLink>
    </Container>
  )
}

const Container = styled(Column)`
  min-width: 10em;
  padding-left: 2em;
`;

const StyledLink = styled(Link)`
  color: white;
`;

export default NavSideBar