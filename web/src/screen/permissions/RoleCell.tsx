import React from 'react'
import Row from 'component/Row';
import styled from 'styled-components';
import Colors from 'util/colors';

const RoleCell = (props: {
    permissionId: string;
    removeRole: (permissionId: string, roleId: string) => void;
    role: {
        id: string;
        name: string;
        color: string;
    }
}) => {
  return (
    <Container onClick={() => props.removeRole(props.permissionId, props.role.id)} {...props as any}>{props.role.name}</Container>
  )
}

const Container = styled(Row)`
  background-color: ${(props: any) => props?.role?.color || '#7b7b7b'};
  padding: .25em 1em;
  border-radius: .25em;
  font-weight: bold;
  margin: 0 .25em;
`;

export default RoleCell;