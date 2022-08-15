import React from 'react'
import Column from 'component/Column';
import styled from 'styled-components';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';

const LearnMore = () => {
  return (
    <Container>
        <LearnMoreText>Learn more</LearnMoreText>
        <DownChevron/>        
    </Container>
  )
}

const Container = styled(Column)`
    align-items: center;
    position: absolute;
    bottom: 0;
    right:  0;
    left: 0;
    padding-bottom: 1em;
`;

const LearnMoreText = styled.span`
    font-size: 1.2em;
    margin-bottom: .5em;
`;

const DownChevron = styled(HiOutlineChevronDoubleDown)`
    font-size: 3em;
`;

export default LearnMore;