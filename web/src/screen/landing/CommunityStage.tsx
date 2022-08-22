import React from 'react'
import styled from 'styled-components';
import Stage from './Stage';
import StageHeaderText from './StageHeaderText';

const CommunityStage = () => {
    return (
        <StyledStage>
            <StyledStageHeaderText>Join the community.</StyledStageHeaderText>
            <Ul>
                <Li>Our subreddit <Anchor
                    href="https://reddit.com/r/roscobot"
                    target="_blank"
                    rel="noopener noreferrer" >https://reddit.com/r/roscobot</Anchor></Li>
                <Li>Our Discord server <Anchor
                    href="https://discord.gg/Ax9ZsdawMb"
                    target="_blank"
                    rel="noopener noreferrer" >link</Anchor></Li>
                <Li>Write a ticket on our <Anchor
                    href="https://github.com/RoscoBot/support/issues/new"
                    target="_blank"
                    rel="noopener noreferrer" >Github Repo</Anchor></Li>
            </Ul>
        </StyledStage>
    )
}

const StyledStage = styled(Stage)`
    align-items: flex-start;
    margin-left: 3em;

    @media (max-width:500px) {
        margin-left: .2em;
    }
`;

const StyledStageHeaderText = styled(StageHeaderText)`
    margin-bottom: 0em;
    font-size: 5em;

    @media (max-width:500px) {
        text-align: center;
        margin: 0;
        font-size: 2.25em;
    }
`;

const Ul = styled.ul`
    font-size: 2em;
    font-weight: lighter;

    @media (max-width:500px) {
      font-size: 1.5em;
    }
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

export default CommunityStage;