import React, { useEffect, useState } from 'react'
import * as GuildApi from 'api/guild';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Colors from 'util/colors';
import RoleCell from './RoleCell';
import Row from 'component/Row';



const customStyles: any = {
  head: {
    style: {
      fontSize: '1.2em',
      fontWeight: 'bold'
    }
  },
  rows: {
    style: {
      fontFamily: 'nunito',
      fontSize: '1em',
      backgroundColor: Colors.BACKGROUND_DARK,
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: Colors.BACKGROUND_DARKER
      }
    }
  }
}

const PermissionTable = ({ server }: any) => {
  const [permissions, setPermissions] = useState([] as any);

  const removeRole = (permissionId: string, roleId: string) => {
    const newPerms = permissions.map((permission: any) => {
      if (permission.id !== permissionId)
        return permission;
      permission.roles = permission.roles.filter((role: any) => role.id !== roleId);
      return permission;
    });
    
    setPermissions([...newPerms]);
  }

  const headers = [
    {
      name: 'Permission',
      sortable: true,
      selector: (row: any) => row.name
    },
    {
      name: 'Allowed Roles',
      sortable: true,
      selector: (row: any) => row.roles,
      cell: (row: any, index: number) => {
        return (
          <RoleContainer>{row.roles.map((r: any, i: number) => (
            <RoleCell
              removeRole={removeRole}
              permissionId={row.id}
              role={r} />))}
          </RoleContainer>
        )
      }
    }
  ];

  useEffect(() => {
    if (permissions.length !== 0)
      return;

    GuildApi.getPermissions(server.id)
      .then((permissions) => setPermissions(permissions))
      .catch((e: any) => console.error(e));
  });

  return <StyledDataTable
    fixedHeader
    selectableRows
    theme="dark"
    onColumnOrderChange={(nextOrder) => console.log(nextOrder)}
    onSort={(column, sortDirection) => {
      console.log(column);
      console.log(sortDirection);
    }}
    customStyles={customStyles}
    columns={headers}
    data={permissions}
  />
};

const StyledDataTable = styled(DataTable)`
  max-height: 100%;
`;

const RoleContainer = styled(Row)`

`;

export default PermissionTable;