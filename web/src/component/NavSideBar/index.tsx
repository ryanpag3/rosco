import Column from 'component/Column'
import Screen from 'component/Screen'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Colors from 'util/colors'

const NavSideBar = () => {
    const navigate = useNavigate();

  return (
    <Container>
        <Title>Table of Contents</Title>
        <StyledLink to="home">Home</StyledLink>
        <StyledLink to="">Documentation</StyledLink>

        <SectionHeader>Configuration</SectionHeader>
        <StyledLink to="config">Main</StyledLink>
        <StyledLink to="permissions">Permissions</StyledLink>

        <SectionHeader>Modules</SectionHeader>

        <SectionSubheader>AutoMod</SectionSubheader>
        <StyledLink to="">Config</StyledLink>
        <StyledLink to=""></StyledLink>

        <SectionSubheader>Scores</SectionSubheader>
        <StyledLink to="scores">Manage Scores</StyledLink>
        <StyledLink to="keywords">Keywords</StyledLink>
        <StyledLink to="scoreboards">Scoreboards</StyledLink>
    </Container>
  )
}

const Container = styled(Column)`
  min-width: 10em;
  padding-left: 2em;
  background-color: ${Colors.BACKGROUND_MEDIUM};
  border-right: solid 1px #858585;
`;

const Title = styled.h2`

`;

const SectionHeader = styled.h3`
  margin-bottom: 0;
  margin-top: .25em;
`;

const SectionSubheader = styled.h4`
  margin-bottom: .25em;
  margin-left: .25em;
  margin-top: .5em;
`;

const StyledLink = styled(Link)`
  color: ${Colors.TEXT_LIGHT};
`;

export default NavSideBar