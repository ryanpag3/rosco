import React from 'react'
import Row from 'component/Row';
import styled from 'styled-components';

const RoleCell = (props: {
    role: {
        id: string;
        name: string;
        color: string;
    }
}) => {
  return (
    <Container {...props as any}>{props.role.name}</Container>
  )
}

const Container = styled(Row)`
  background-color: ${(props: any) => props?.role?.color || '#7b7b7b'};
  padding: .18em .5em;
  border-radius: .3em;
  font-weight: bold;
  margin: 0 .25em;
`;

export default RoleCell;