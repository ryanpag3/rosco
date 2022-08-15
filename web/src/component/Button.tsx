import React from 'react'
import styled from 'styled-components';

const Button = (props: any) => {
  return (
    <StyledButton {...props}>
        {props.children}
    </StyledButton>      
  )
}

const StyledButton = styled.button`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: .6em;
    padding: .6em;
    font-size: 1.2em;
`;

export default Button;