import React from 'react'
import ReactSelect, { Props, StylesConfig } from 'react-select'
import { SelectComponents } from 'react-select/dist/declarations/src/components'
import styled from 'styled-components'
import Colors from 'util/colors'
import Column from './Column'

const Select = (props: Props) => {
  return (
    <Container>
      <ReactSelect
        {...props}
        styles={{ ...SelectStyle, ...props.styles }}
      />
    </Container>
  )
}

const Container = styled(Column)`

`;

const backgroundColor = Colors.DROPDOWN_BACKGROUND_LIGHT;
const focusedBackgroundColor = Colors.BACKGROUND_LIGHT;
const textColor = Colors.TEXT_DARK;

const SelectStyle: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    fontFamily: 'nunito',
    border: 0,
    boxShadow: 'none',
    color: Colors.TEXT_DARK,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: textColor
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: textColor
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: textColor,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
  }),
  container: (provided, state) => ({
    ...provided,
    color: Colors.TEXT_DARK,
    borderColor: 'black',
  }),
  input: (provided, state) => ({
    ...provided
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ?
      focusedBackgroundColor : backgroundColor,
    color: textColor,
    fontWeight: state.isFocused ? 'bold' : 'normal',
    display: 'flex',
    alignItems: 'center'
  })
}

export default Select