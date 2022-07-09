import Button from 'component/Button'
import Column from 'component/Column'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Colors from 'util/colors'

const NavSideBar = () => {
  return (
    <Container>
      <Title>Table of Contents</Title>
      <StyledLink to="home">Home</StyledLink>

      <SectionHeader>Configuration</SectionHeader>
      <StyledLink to="config">Main</StyledLink>
      <StyledLink to="permissions">Permissions</StyledLink>

      <SectionHeader>Modules</SectionHeader>
      <SectionSubheader>AutoMod</SectionSubheader>
      <IndentedLink to="auto-mod/banned-words">Banned Words</IndentedLink>
      <IndentedLink to="auto-mod/capslock-detect">Capslock Spam</IndentedLink>
      <IndentedLink to="auto-mod/link-detect" style={{ marginBottom: '.6em' }}>Link Detection</IndentedLink>
      <StyledLink to="scores">Scores</StyledLink>
      <StyledButton
        onClick={() => window.open('https://github.com/RoscoBot/support/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=')}
      >Feature Request</StyledButton>
     <StyledButton
        onClick={() => window.open('https://github.com/RoscoBot/support/issues/new?assignees=&labels=bug&template=bug_report.md&title=')}
      >Bug Report</StyledButton> 
    </Container>
  )
}

const Container = styled(Column)`
  height: 100%;
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

const StyledButton = styled.a`
  cursor: pointer;
  text-decoration: underline;
  background: none;
  color: ${Colors.TEXT_LIGHT};
  margin-bottom: .2em;
`;

const StyledLink = styled(Link)`
  color: ${Colors.TEXT_LIGHT};
  margin-bottom: .2em;
`;

const IndentedLink = styled(StyledLink)`
  margin-left: .4em;
`;

export default NavSideBar