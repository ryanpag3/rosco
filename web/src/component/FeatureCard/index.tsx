import Column from 'component/Column';
import React from 'react'
import styled from 'styled-components';

const FeatureCard = (props: {
    image: string;
    title: string;
    description: string;
    docUrl: string;
    features: string[];
}) => {
    console.log(props);
    return (
        <Container {...props}>
            <Img src={props.image} />
            <Title>{props.title}</Title>
            <Description>{props.description}</Description>
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
`;

const Description = styled(FeatureCardText)`
    font-size: 1em;
    font-weight: lighter;
    text-align: center;
    max-width: 85%;
`;

const Img = styled.img`
    width: 12.5em;
`;

export default FeatureCard;