import React from 'react'
import styled from 'styled-components';
import Stage from './Stage';
import StageHeaderText from './StageHeaderText';

const QuestionsStage = () => {
  return (
      <StyledStage>
          <StyledStageHeaderText>Join the community.</StyledStageHeaderText>
          <Ul>
              <Li>Our subreddit <Anchor>https://reddit.com/r/roscobot</Anchor></Li>
              <Li>Our Discord server <Anchor>link</Anchor></Li>
              <Li>Write a ticket on our <Anchor>Github Repo</Anchor></Li>
          </Ul>
      </StyledStage>
  )
}

const StyledStage = styled(Stage)`
    align-items: flex-start;
    margin-left: 3em;
`;

const StyledStageHeaderText = styled(StageHeaderText)`
    margin-bottom: 0em;
    font-size: 5em;
`;

const Ul = styled.ul`
    font-size: 2em;
    font-weight: lighter;
`;

const Li = styled.li`

`;

const Anchor = styled.a`
    color: #9ac2ff;
    font-weight: normal;

    :hover {
        cursor: pointer;
        color: #1c76fe;
    }
`;

export default QuestionsStage;