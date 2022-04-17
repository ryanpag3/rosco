import Column from 'component/Column'
import Screen from 'component/Screen'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const NavSideBar = () => {
    const navigate = useNavigate();

  return (
    <Container>
        <Title>Table of Contents</Title>
        <StyledLink to="home">Home</StyledLink>
        <StyledLink to="">Documentation</StyledLink>

        <SectionHeader>Configuration</SectionHeader>
        <StyledLink to="config">Main</StyledLink>
        <StyledLink to="">Permissions</StyledLink>

        <SectionHeader>Scores</SectionHeader>
        <StyledLink to="scores">Manage Scores</StyledLink>
        <StyledLink to="keywords">Keywords</StyledLink>
        <StyledLink to="scoreboards">Scoreboards</StyledLink>

        <SectionHeader>AutoMod</SectionHeader>
        <StyledLink to="">Config</StyledLink>
        <StyledLink to=""></StyledLink>
    </Container>
  )
}

const Container = styled(Column)`
  min-width: 10em;
  padding-left: 2em;
  background-color: #3f3f3f;
`;

const Title = styled.h2``;

const SectionHeader = styled.h3`
  margin: .5em;
`;

const StyledLink = styled(Link)`
  color: white;
`;

export default NavSideBar