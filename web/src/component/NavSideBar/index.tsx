import Column from 'component/Column'
import React from 'react'
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
      <IndentedLink to="auto-mod/banned-words">Banned Words</IndentedLink>
      <IndentedLink to="" style={{ marginBottom: '.6em' }}>Link Detection</IndentedLink>
      <StyledLink to="scores">Score</StyledLink>
      <StyledLink to="keywords">Keyword</StyledLink>
      <StyledLink to="scoreboards">Scoreboard</StyledLink>
      <StyledLink to="polls">Poll</StyledLink> 
      <StyledLink to="stopwatch">Stopwatch</StyledLink>
      <StyledLink to="timer">Timer</StyledLink>
    </Container>
  )
}

const Container = styled(Column)`
  min-height: 100vh;
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
  margin-bottom: .2em;
`;

const IndentedLink = styled(StyledLink)`
  margin-left: .4em;
`;

export default NavSideBar