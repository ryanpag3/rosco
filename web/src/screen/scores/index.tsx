import React, { useEffect, useState } from 'react';
import { 
    Column, 
    Table, 
    WindowScroller, 
    InfiniteLoader 
} from 'react-virtualized';
import ColumnDiv from 'component/Column';
import styled from 'styled-components';
import * as ScoreApi from 'api/score';

const sampleData = [
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
    }
];

const Scores = (props: any) => {
    const [ data, setData ] = useState([] as any[]);
    const [ totalRowCount, setTotalRowCount ] = useState(0);
    const [filter, setFilter] = useState();

    useEffect(() => {
        if (data.length !== 0)
            return;
        loadMoreRows({
            startIndex: 0,
            stopIndex: 10
        }).then();
    });

    async function loadMoreRows({ 
        startIndex, 
        stopIndex 
    }: { startIndex: number, stopIndex: number }) {
        console.log('load more rows');
        const res = await ScoreApi.list(
            props.server.id as any,
            stopIndex - startIndex + 1,
            startIndex,
            filter
        );

        setTotalRowCount(res.data.total);
        // @ts-ignore
        setData([...data, ...res.data.scores]);
    }

    function isRowLoaded({ index }: any) {
        return !!data[index];
    }

    return (
        // @ts-ignore
        <WindowScroller>
            {({height, width, isScrolling, onChildScroll, scrollTop}) => (
            // @ts-ignore
             <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={totalRowCount}
              >
                {({ onRowsRendered, registerChild }) => (
                    // @ts-ignore
                    <Table
                        autoHeight
                        height={height}
                        width={width}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        scrollTop={scrollTop}
                        rowCount={data.length}
                        rowGetter={({ index }) => {
                            let obj = data[index];
                            const d = new Date(obj.createdAt);
                            obj.createdAt = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
                            return obj;
                        }}
                        headerHeight={50}
                        rowHeight={40}
                    >
                        {/* @ts-ignore */}
                        <Column label="Created At" dataKey="createdAt" width={150}/>
                        {/* @ts-ignore */}
                        <Column label="Amount" dataKey="amount" width={100}/>
                        {/* @ts-ignore */}
                        <Column label="Name" dataKey="name" minWidth={100}/>
                        {/* @ts-ignore */}
                        <Column label="Description" dataKey="description" minWidth={150} flexGrow={1}/>
                    </Table>
                )}
              </InfiniteLoader>
            )}
        </WindowScroller>
    )
};

const Container = styled(ColumnDiv)`
    height: 100vh;
`;

export default Scores;