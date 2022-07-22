import styled from 'styled-components';

import React from 'react'

const Input = (props: any) => {
  return (
      <StyledInput {...props}>{props.children}</StyledInput>
  )
}

const StyledInput = styled.input`
    padding: .2em;
    font-size: .7em;
    border-radius: .3em;
    outline: none;
`;

export default Input;