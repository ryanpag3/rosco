import React, { useEffect, useState } from 'react'
import * as GuildApi from 'api/guild';

import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';
import Column from 'component/Column';
import styled from 'styled-components';

const headers = [
  {
    key: 'name',
    header: 'Name'
  },
  {
    key: 'roleNames',
    header: 'Allowed Roles'
  }
];

const PermissionTable = ({ server }: any) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (permissions.length !== 0)
      return;

    GuildApi.getPermissions(server.id)
      .then((permissions) => setPermissions(permissions))
      .catch((e) => console.error(e));
  });

  return (
    <Container>
      <DataTable rows={permissions} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }: any) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header: any) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell: any) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </Container>

  )
}

const Container = styled(Column)`

`;

export default PermissionTable