import Column from 'component/Column';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';

const FeatureCard = (props: {
    image: string;
    title: string;
    description: string;
    docUrl: string;
    features: string[];
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => console.log(isFlipped), [ isFlipped ]);

    return (
        <Container {...props} onClick={() => setIsFlipped(!isFlipped)}>
            {
                !isFlipped ? 
                <React.Fragment>
                    <Img src={props.image} />
                    <Title>{props.title}</Title>
                    <Description>{props.description}</Description>
                </React.Fragment> :
                <React.Fragment>
                    <Title>{props.title}</Title>
                    <FeaturesColumn>
                        <FeaturesTitle>Features</FeaturesTitle>
                        <FeaturesUl>
                            {props.features.map((f, i) => {
                                return <Feature key={i}>{f}</Feature>
                            })}
                        </FeaturesUl>
                    </FeaturesColumn>
                    <DocAnchor>Documentation</DocAnchor>
                </React.Fragment>
            }
        </Container>
    )
}

const Container = styled(Column)`
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 14em;
    height: 22em;
    border-radius: 2em;
    margin: 1em;
    padding: .5em;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.66);
    cursor: pointer;

    :hover {
        width: 14.2em;
        height: 22.2em;
        margin: .9em;
        box-shadow: none;
    }
`;

const FeatureCardText = styled.text`
    color: black;
`;

const Title = styled(FeatureCardText)`
    font-weight: bold;
    font-size: 1.5em;
    margin-top: .75em;
`;

const FeaturesTitle = styled(Title)`
    font-size: 1.3em;
    font-weight: normal;
`;

const Description = styled(FeatureCardText)`
    font-size: 1em;
    font-weight: lighter;
    text-align: center;
    max-width: 85%;
    flex-grow: 1;
`;

const Img = styled.img`
    width: 12.5em;
`;

const FeaturesColumn = styled(Column)` 
    padding-left: 1.5em;
    padding-top: 1em;
    height: 100%;
    width: 100%;
`;

const FeaturesUl = styled.ul`
    color: black;
    padding-left: 1em;
    padding-right: 1em;
    font-size: .9em;
`;

const Feature = styled.li`
    margin-left: 0;
    margin-bottom: .5em;
`;

const DocAnchor = styled.a`
    color: #1c76fe;
    margin: 1em;
    cursor: pointer;
`;

export default FeatureCard;