import React from 'react'
import FeatureCard from 'component/FeatureCard';
import Features from './Features';
import Stage from './Stage';
import styled from 'styled-components';
import Row from 'component/Row';
import StageHeaderText from './StageHeaderText';

const FeatureCardStage = () => {
    return (
        <Stage>
            <StyledRow>
                <StageHeaderText>ROSCO is jam-packed with several modules to help manage, moderate, and engage your community.</StageHeaderText>
            </StyledRow>
            <FeatureCardRow>
                {
                    Features.map((f) => {
                        return <FeatureCard
                            {...f}
                        />
                    })
                }
            </FeatureCardRow>
            <AndMoreText>and more to come</AndMoreText>
        </Stage>
    )
}

const StyledRow = styled(Row)`
  max-width: 90%;
`;


const FeatureCardRow = styled(Row)`
  justify-content: center;
  width: 90%;
  flex-wrap: wrap;
`;

const AndMoreText = styled.span`
  font-weight: lighter;
  letter-spacing: .25em;
  font-size: 2.5em;
  margin-bottom: .5em;
  margin-top: 1em;

  @media (max-width:500px) {
      font-size: 1.5em;
  }
`;

export default FeatureCardStage;