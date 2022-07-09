import Column from 'component/Column';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import * as ScoreApi from 'api/score';
import { CellClickedEvent, CellValueChangedEvent, ColDef } from 'ag-grid-community';
import Button from 'component/Button';
import { FaPlus, FaTrash } from 'react-icons/fa';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import Colors from 'util/colors';
import ReactTooltip from 'react-tooltip';
import ScoreModal from './ScoreModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { dateComparator } from 'util/date';


const Scores = (props: any) => {
  const gridRef = useRef();
  const [data, setData] = useState([] as any);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [scoreToDelete, setScoreToDelete] = useState(undefined as any);

  useEffect(() => {
    if(isLoaded)
      return;

    ScoreApi.listAll(props.server.id)
      .then(({ data }) => {
          setData(data);
          setIsLoaded(true);
      });
  });

  const ColumnDefs: ColDef[] = [
    {
        field: 'createdAt', 
        headerName: 'Created At', 
        sortable: true, 
        filter: 'agDateColumnFilter',
        cellRenderer: ({ data }: any) => {
            const d = new Date(data.createdAt);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        },
        valueGetter: (params: any) => {
            return new Date(params.data.createdAt)
        },
        comparator: (valueA: any, valueB: any) => {
            return dateComparator(valueA, valueB);
        }
    },
    {
        field: 'updatedAt', 
        headerName: 'Updated At', 
        sortable: true, 
        filter: 'agDateColumnFilter',
        cellRenderer: ({ data }: any) => {
            const d = new Date(data.updatedAt);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        },
        valueGetter: (params: any) => {
            return new Date(params.data.updatedAt)
        },
        comparator: (valueA: any, valueB: any) => {
            return dateComparator(valueA, valueB);
        }
    },
    { 
        field: 'amount', 
        headerName: 'Amount', 
        editable: true, sortable: true, 
        filter: 'agNumberColumnFilter'
    },
    { 
        field: 'name', 
        headerName: 'Name', 
        editable: true, 
        sortable: true, 
        filter: 'agTextColumnFilter' 
    },    
    { 
        field: 'color', 
        headerName: 'Color', 
        sortable: true 
    },
    {
        headerName: '',
        cellRenderer: (e: any) => {
            return (<TrashIcon/>)
        },
        onCellClicked: (e: CellClickedEvent) => {
            e.node.setRowSelectable(false);
            setScoreToDelete({ ...e.data, index: e.rowIndex });
        },
        width: 50,
    }
  ]; 

  return (
      <Container>
          <AgGridReact
              ref={gridRef as any}
              className="ag-theme-alpine-dark"
              columnDefs={ColumnDefs}
              rowData={data}
              onCellValueChanged={async (event: CellValueChangedEvent) => {
                let updatedData = data;
                updatedData[event.rowIndex as number] = event.data;
                setData(updatedData);
                const updated = {
                  [event.colDef.field as string]: event.colDef.field === 'amount' ? 
                                                  Number.parseInt(event.newValue) : event.newValue
                };

                await ScoreApi.updateScore(props.server.id, event.data.id, updated);
              }}
          />
          <CreateButton
            data-tip
            data-for="createScore"
            onClick={() => setShowCreateModal(true)}
          >
            <PlusIcon/>
          </CreateButton>
          {/* @ts-ignore */}
          <ReactTooltip id="createScore" place="left" type="light" effect="solid" delayShow={300}>
              <span>Create a new score.</span>
          </ReactTooltip>

          <ScoreModal
            action="Create"
            server={props.server}
            onModalDismissed={(score) => {
              setShowCreateModal(false);
              if (score) {
                setData([score, ...data]);
              }
            }}
            isOpen={showCreateModal}
          />

          <DeleteConfirmationModal
            server={props.server}
            score={scoreToDelete}
            isOpen={scoreToDelete !== undefined}
            onDismiss={(isSubmitted: boolean) => {
              if (isSubmitted) {
                const copy = [...data];              
                copy.splice(scoreToDelete.index, 1);
                setData(copy);
              }
              setScoreToDelete(undefined);
            }}
          />
      </Container>
  );
}

const Container = styled(Column)`
    height: 100%;
    width: 100%;
`;

const CreateButton = styled(Button)`
  height: 3em;
  width: 3em;
  border-radius: 50%;
  position: absolute;
  bottom: 2em;
  right: 2em;
  background-color: ${Colors.BUTTON_GREEN};

  :hover {
    background-color: ${Colors.BUTTON_GREEN_HOVER};
  }
`;

const PlusIcon = styled(FaPlus)`
  font-size: 1.75em;
  color: ${Colors.TEXT_DARK};
`;

const TrashIcon = styled(FaTrash)`
    color: ${Colors.TEXT_MEDIUM};
    cursor: pointer;
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