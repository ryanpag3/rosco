import Column from 'component/Column'
import Input from 'component/Input'
import React from 'react'
import styled from 'styled-components'
import Colors from 'util/colors'

const SearchInput = (props: {
  onChangeText: (search: any) => void;
}) => {
  return (
    <Container>
        <StyledSearchInput
            onChange={props.onChangeText}
            placeholder="Filter"
        />        
    </Container>
  )
}

const Container = styled(Column)`
    align-items: center;
    justify-content: center;
`;

const StyledSearchInput = styled(Input)`
    background-color: transparent;
    color: ${Colors.TEXT_LIGHT};
    border: none;
    border-radius: 0em;
    border-bottom: solid 2px ${Colors.TEXT_LIGHT};
    margin: .25em 2em;
    font-size: .6em;
    width: 20em;
`;

export default SearchInput