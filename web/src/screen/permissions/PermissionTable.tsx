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
  const [timeToRefresh, setTimeToRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(undefined as any); 

  const refresh = () => setTimeToRefresh(!timeToRefresh);

  const onFilterChanged = (filter: any) => setFilter(filter.target.value)

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
    if (permissions.length !== 0 && !timeToRefresh)
      return;
    setIsLoading(true);
    GuildApi.getPermissions(server.id)
      .then((permissions) => {
        setIsLoading(false);
        setTimeToRefresh(false);
        setPermissions(permissions)
      })
      .catch((e: any) => console.error(e));
  });

  return <StyledDataTable
    fixedHeader
    selectableRows
    highlightOnHover
    pointerOnHover
    actions={<TableActions
      onFilterChanged={onFilterChanged}
      refresh={refresh}
      selectedCommands={selectedRows}
    />}
    theme="dark"
    onColumnOrderChange={(nextOrder) => console.log(nextOrder)}
    onSort={(column, sortDirection) => {
      console.log(column);
      console.log(sortDirection);
    }}
    progressPending={isLoading}
    customStyles={customStyles}
    columns={headers}
    data={permissions.filter((p: any) => {
      if (!filter || filter === '')
        return true;
      return p.name.includes(filter);      
    })}
    onSelectedRowsChange={(selected) => setSelectedRows(selected.selectedRows)}
  />
};

const StyledDataTable = styled(DataTable)`
  min-height: 100%;
`;

const RoleContainer = styled(Row)`

`;

const customStyles: any = {
  header: {
    style: {
      height: '1.5em',
      maxHeight: '1.5em',
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      borderBottomColor: '#858585' 
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
      borderBottomWidth: '1px',
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
  },
  progress: {
    style: {
      alignItems: 'center',
      justifyContent:  'center'
    }
  }
}

export default PermissionTable;