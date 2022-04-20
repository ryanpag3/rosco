import React from 'react'

import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';

const rows = [
  {
    id: 'a',
    name: 'Load balancer 1',
    status: 'Disabled',
  },
  {
    id: 'b',
    name: 'Load balancer 2',
    status: 'Starting',
  },
  {
    id: 'c',
    name: 'Load balancer 3',
    status: 'Active',
  },
];

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const PermissionTable = () => {
  return (
    <DataTable rows={rows} headers={headers}>
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
  )
}

export default PermissionTable