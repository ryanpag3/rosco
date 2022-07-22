import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Input from './Input';

const LabelledInput = (props: {
  label: string;
  value: string;
  labelStyle?: FlattenSimpleInterpolation;
  spanStyle?: FlattenSimpleInterpolation;
  inputStyle?: FlattenSimpleInterpolation;
  inputOverride?: any;
  onChange?: (value: string) => void;
}) => {
  return (
    <StyledLabel
      // @ts-ignore
      labelStyle={props.labelStyle}
    >
      <StyledSpan
        // @ts-ignore
        spanStyle={props.spanStyle}
      >{props.label}</StyledSpan>
      {
      props.inputOverride ? 
      props.inputOverride :
      <StyledInput
        // @ts-ignore
        inputStyle={props.inputStyle}
        value={props.value}
        onChange={(e: any) => props.onChange ? props.onChange(e.target.value): null}
      />
      }
    </StyledLabel>
  )
}


const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    ${(props: any) => props.labelStyle};
`;

const StyledSpan = styled.span`

  ${(props: any) => props.spanStyle}
`;

const StyledInput = styled(Input)`

  ${(props: any) => props.inputStyle}
`;

export default LabelledInput