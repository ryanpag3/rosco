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
import ScoreModal from './ScoreModal';

const Scores = (props: any) => {
    const [data, setData] = useState([] as any[]);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [filter, setFilter] = useState();
    const [selectedScore, setSelectedScore] = useState(undefined as any);

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

    function onRowClick({ event, index, rowData }: any) {
        rowData.index = index;
        setSelectedScore(rowData);
    }

    function onModalDismissed(score: any) {
        setSelectedScore(undefined as any);
        data[score.index] = score;
        setData([...data]);
    }

    return (
        <React.Fragment>
            {/* @ts-ignore */}
            <WindowScroller>
                {({ height, width, isScrolling, onChildScroll, scrollTop }) => (
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
                                onRowClick={onRowClick}
                                rowStyle={{
                                    cursor: 'default'
                                }}
                            >
                                {/* @ts-ignore */}
                                <Column label="Created At" dataKey="createdAt" width={200} />
                                {/* @ts-ignore */}
                                <Column label="Amount" dataKey="amount" minWidth={80} />
                                {/* @ts-ignore */}
                                <Column label="Name" dataKey="name" minWidth={100} />
                                {/* @ts-ignore */}
                                <Column label="Description" dataKey="description" minWidth={150} flexGrow={1} />
                            </Table>

                        )}
                    </InfiniteLoader>
                )}
            </WindowScroller>
            <ScoreModal
                action="Update"
                server={props.server}
                isOpen={selectedScore !== undefined}
                onDismiss={onModalDismissed}
                score={selectedScore}
            />
        </React.Fragment>
    )
};

const Container = styled(ColumnDiv)`
    height: 100vh;
`;

export default Scores;