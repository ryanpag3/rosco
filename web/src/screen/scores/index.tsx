import Column from 'component/Column';
import React from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const Scores = (props: any) => {

    const columnDefs = [
        { field: 'createdAt', headerName: 'Created At' },
        { field: 'color', headerName: 'Color' },
        { field: 'name', headerName: 'Name' },
        { field: 'amount', headerName: 'Amount' }
    ];

    const data = [
        {
          id: '0f15217e-f8d4-4f16-ae25-be5cdc2d2fb1',
          createdAt: '2022-05-20T23:33:01.960Z',
          updatedAt: '2022-06-23T14:34:37.054Z',
          name: 'ttt',
          description: 'asdasdasdasd',
          color: '#5dd3a6',
          amount: 1,
          serverId: '09737e82-92cb-4b16-9f3b-74d29841d2d9',
          channelId: null,
          userId: null,
          ScoreboardScore: []
        },
        {
          id: '95212bfc-1569-424f-8a11-0ea370f3031c',
          createdAt: '2022-05-20T23:25:11.085Z',
          updatedAt: '2022-05-20T23:25:11.085Z',
          name: 'qqqqqq',
          description: 'qqqqq',
          color: '',
          amount: 1,
          serverId: '09737e82-92cb-4b16-9f3b-74d29841d2d9',
          channelId: null,
          userId: null,
          ScoreboardScore: []
        },
        {
          id: '76f1b5cb-8fa4-4627-b262-706442460ab5',
          createdAt: '2022-05-20T23:28:29.274Z',
          updatedAt: '2022-05-21T18:25:12.579Z',
          name: 'zzz',
          description: 'asdasdasdad',
          color: '#fc3a60',
          amount: 0,
          serverId: '09737e82-92cb-4b16-9f3b-74d29841d2d9',
          channelId: null,
          userId: null,
          ScoreboardScore: []
        },
        {
          id: 'd24158d7-7834-4ad3-84c1-19686d87a168',
          createdAt: '2022-05-20T23:29:31.747Z',
          updatedAt: '2022-05-21T18:22:55.810Z',
          name: 'asdasdasdasdasd',
          description: 'xzczxczxxzczxc',
          color: '#84eda9',
          amount: 0,
          serverId: '09737e82-92cb-4b16-9f3b-74d29841d2d9',
          channelId: null,
          userId: null,
          ScoreboardScore: []
        },
        {
          id: 'b3eec680-a38d-498f-b977-7048a3c15cf0',
          createdAt: '2022-05-20T23:34:29.210Z',
          updatedAt: '2022-05-21T18:22:01.420Z',
          name: 'tttttttt',
          description: 'testing',
          color: '#d80003',
          amount: 0,
          serverId: '09737e82-92cb-4b16-9f3b-74d29841d2d9',
          channelId: null,
          userId: null,
          ScoreboardScore: []
        },
        {
          id: '93674def-4ebb-40cd-b99b-7f8201584d20',
          createdAt: '2022-05-20T23:35:45.613Z',
          updatedAt: '2022-05-20T23:35:45.613Z',
          name: 'ttttaaaa',
          description: null,
          color: '#9effb9',
          amount: 0,
          serverId: '09737e82-92cb-4b16-9f3b-74d29841d2d9',
          channelId: null,
          userId: null,
          ScoreboardScore: []
        },
        {
          id: 'c86162c4-ea6a-4156-b1cb-5f8cb014295e',
          createdAt: '2022-05-20T23:36:04.964Z',
          updatedAt: '2022-05-21T18:54:15.139Z',
          name: 'xvcbxcvb1111',
          description: '111111',
          color: '#1e3b84',
          amount: 0,
          serverId: '09737e82-92cb-4b16-9f3b-74d29841d2d9',
          channelId: null,
          userId: null,
          ScoreboardScore: []
        }
      ];

    return (
        <Container>
            <AgGridReact
                className="ag-theme-alpine-dark"
                // @ts-ignore
                columnDefs={columnDefs}
                rowData={data}
            />
        </Container>
    );
}

const Container = styled(Column)`
    height: 100%;
    width: 100%;
`;

export default Scores;







































// import React, { useEffect, useState } from 'react';
// import {
//     Column,
//     Table,
//     WindowScroller,
//     InfiniteLoader,
//     SortDirection
// } from 'react-virtualized';
// import * as ScoreApi from 'api/score';
// import ScoreModal from './ScoreModal';
// import TableHeader from './TableHeader';
// import styled from 'styled-components';
// import Row from 'component/Row';
// import DashboardScreen from 'component/DashboardScreen';
// import Colors from 'util/colors';

// const Scores = (props: any) => {
//     const [data, setData] = useState([] as any[]);
//     const [totalRowCount, setTotalRowCount] = useState(0);
//     const [filter, setFilter] = useState(undefined as any);
//     const [selectedScore, setSelectedScore] = useState(undefined as any);
//     const [sortKey, setSortKey] = useState('amount');
//     const [sortDirection, setSortDirection] = useState(SortDirection.DESC as any);

//     useEffect(() => {
//         loadMoreRows({
//             startIndex: 0,
//             stopIndex: 10
//         }, true);
//     }, [ filter ]);


//     useEffect(() => {
//         if (data.length !== 0)
//             return;
//         loadMoreRows({
//             startIndex: 0,
//             stopIndex: 10
//         }).then();
//     });

//     async function loadMoreRows({
//         startIndex,
//         stopIndex
//     }: { startIndex: number, stopIndex: number }, override: boolean = false) {
//         const res = await ScoreApi.list(
//             props.server.id as any,
//             stopIndex - startIndex + 1,
//             startIndex,
//             filter
//         );

//         setTotalRowCount(res.data.total);

//         const newData = override ? [ ...res.data.scores ] : [...data, ...res.data.scores];

//         // @ts-ignore
//         setData(newData);
//     }

//     function isRowLoaded({ index }: any) {
//         return !!data[index];
//     }

//     function onRowClick({ event, index, rowData }: any) {
//         rowData.index = index;
//         setSelectedScore(rowData);
//     }

//     function onHeaderClick( clickInfo: any ) {
//         if (clickInfo.dataKey !== sortKey) {
//             setSortKey(clickInfo.dataKey);
//         } else if (sortDirection === SortDirection.DESC) {
//             setSortDirection(SortDirection.ASC);
//         } else {
//             setSortDirection(SortDirection.DESC);
//         }
//     }

//     function onModalDismissed(score: any) {
//         setSelectedScore(undefined as any);
//         upsertScoreToData(score);
//     }

//     function sortData({ defaultSortDirection, event, sortBy, sortDirection }: any) {
//         console.log(sortBy);

//         const sorted = data.sort((a: any, b: any) => {
//             const dir = sortDirection === SortDirection.ASC ? -1 : 1;
//             const propA = a[sortBy];
//             const propB = b[sortBy];

//             if (propA < propB)
//                 return 1 * dir;
//             if (propA > propB)
//                 return -1 * dir;

//             return 0;
//         });

//         setData(sorted);
//     }

//     function upsertScoreToData(score: any) {
//         console.log(data);
//         let updatedData = data;
//         let isUpdate = false;
//         for (let i = 0; i < data.length; i++) {
//             if (score.name === data[i].name) {
//                 updatedData[i] = score;
//                 isUpdate = true;
//                 break;
//             }
//         }

//         if (!isUpdate)
//             updatedData = [score, ...data];
        
//         setData([ ...updatedData ]);
//     }

//     return (
//         <Container>
//             <HeaderRow>
//                 <EmptySpace/>
//                 <TableHeader
//                     server={props.server}
//                     onDismiss={(score: any) => upsertScoreToData(score)}
//                     onFilterChanged={(filter: string) => setFilter(filter)}
//                 />
//             </HeaderRow>
//             {/* @ts-ignore */}
//             <WindowScroller>
//                 {({ height, width, isScrolling, onChildScroll, scrollTop }) => (
//                     // @ts-ignore
//                     <InfiniteLoader
//                         isRowLoaded={isRowLoaded}
//                         loadMoreRows={loadMoreRows}
//                         rowCount={totalRowCount}
//                     >
//                         {({ onRowsRendered, registerChild }) => (
//                             // @ts-ignore
//                             <Table
//                                 autoHeight
//                                 height={height}
//                                 width={width}
//                                 onRowsRendered={onRowsRendered}
//                                 ref={registerChild}
//                                 isScrolling={isScrolling}
//                                 onScroll={onChildScroll}
//                                 scrollTop={scrollTop}
//                                 rowCount={data.length}
//                                 rowGetter={({ index }) => {
//                                     let obj = data[index];
//                                     const d = new Date(obj.createdAt);
//                                     obj.createdAt = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
//                                     return obj;
//                                 }}
//                                 headerHeight={50}
//                                 rowHeight={40}
//                                 onRowClick={onRowClick}
//                                 onHeaderClick={onHeaderClick}
//                                 rowStyle={{
//                                     cursor: 'default',
//                                     borderBottom: '1px solid ' + Colors.BACKGROUND_MEDIUM_LIGHT
//                                 }}
//                                 sort={sortData}
//                                 sortBy={sortKey}
//                                 sortDirection={sortDirection}
//                             >
//                                 {/* @ts-ignore */}
//                                 <Column label="Created At" dataKey="createdAt" width={200} />
//                                 {/* @ts-ignore */}
//                                 <Column label="Amount" dataKey="amount" minWidth={80} />
//                                 {/* @ts-ignore */}
//                                 <Column label="Name" dataKey="name" minWidth={100} />
//                                 {/* @ts-ignore */}
//                                 <Column label="Description" dataKey="description" minWidth={150} flexGrow={1} />
//                             </Table>

//                         )}
//                     </InfiniteLoader>
//                 )}
//             </WindowScroller>
//             <ScoreModal
//                 action="Update"
//                 server={props.server}
//                 isOpen={selectedScore !== undefined}
//                 onModalDismissed={onModalDismissed}
//                 score={selectedScore}
//             />
//         </Container>
//     )
// };

// const Container = styled(DashboardScreen)`

// `;

// const HeaderRow = styled(Row)`
//     width: 100%;
//     min-height: 1em;
//     align-items: center;
// `;

// const EmptySpace = styled.div`
//     flex-grow: 1;
// `;

// export default Scores;