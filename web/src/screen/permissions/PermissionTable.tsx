import React, { useEffect, useState } from 'react'
import * as GuildApi from 'api/guild';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Colors from 'util/colors';
import RoleCell from './RoleCell';
import Row from 'component/Row';
import TableActions from './TableActions';

const PermissionTable = ({ server }: any) => {
  const [permissions, setPermissions] = useState([] as any);
  const [selectedRows, setSelectedRows] = useState([] as any);

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
    highlightOnHover
    pointerOnHover
    actions={<TableActions
      selectedCommands={selectedRows}
    />}
    theme="dark"
    onColumnOrderChange={(nextOrder) => console.log(nextOrder)}
    onSort={(column, sortDirection) => {
      console.log(column);
      console.log(sortDirection);
    }}
    customStyles={customStyles}
    columns={headers}
    data={permissions}
    onSelectedRowsChange={(selected) => setSelectedRows(selected.selectedRows)}
  />
};

const StyledDataTable = styled(DataTable)`
  max-height: 100%;
`;

const RoleContainer = styled(Row)`

`;

const customStyles: any = {
  header: {
    style: {
      minHeight: '1.5em'
    }
  },
  head: {
    style: {
      fontSize: '1em',
      fontWeight: 'bold'
    }
  },
  headRow: {
    style: {
      borderBottomStyle: 'solid',
      borderBottomWidth: '3px',
      borderBottomColor: '#858585'
    }
  },
  rows: {
    style: {
      fontFamily: 'nunito',
      fontSize: '.9em',
      backgroundColor: Colors.BACKGROUND_DARK,
      minHeight: '2.75em',
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#808080'
      }
    },
    highlightOnHoverStyle: {
      backgroundColor: Colors.BACKGROUND_MEDIUM
    }
  },
  contextMenu: {
    style: {
      width: '10em',
      backgroundColor: 'transparent'
    }
  }
}

export default PermissionTable;