import React from 'react'
import styled from 'styled-components';
import Stage from './Stage';
import StageHeaderText from './StageHeaderText';

const QuestionsStage = () => {
  return (
      <StyledStage>
          <StyledStageHeaderText>Join our community.</StyledStageHeaderText>
          <Ul>
              <Li>Join us on reddit at <a>https://reddit.com/r/roscobot</a></Li>
              <Li>Join our Discord server <a>link</a></Li>
              <Li>Write a ticket on our <a>Github Repo</a></Li>
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
    font-size: 7em;
`;

const Ul = styled.ul`
    font-size: 1.25em;
`;

const Li = styled.li`

`;

export default QuestionsStage;