import React, { useEffect, useState } from 'react';
import {
    Column,
    Table,
    WindowScroller,
    InfiniteLoader,
    SortDirection
} from 'react-virtualized';
import * as ScoreApi from 'api/score';
import ScoreModal from './ScoreModal';
import TableHeader from './TableHeader';
import styled from 'styled-components';
import RoscoColumn from 'component/Column';
import Row from 'component/Row';

const Scores = (props: any) => {
    const [data, setData] = useState([] as any[]);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [filter, setFilter] = useState();
    const [selectedScore, setSelectedScore] = useState(undefined as any);
    const [sortKey, setSortKey] = useState('amount');
    const [sortDirection, setSortDirection] = useState(SortDirection.DESC as any);

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

    function onHeaderClick( clickInfo: any ) {
        if (clickInfo.dataKey !== sortKey) {
            setSortKey(clickInfo.dataKey);
        } else if (sortDirection === SortDirection.DESC) {
            setSortDirection(SortDirection.ASC);
        } else {
            setSortDirection(SortDirection.DESC);
        }
    }

    function onModalDismissed(score: any) {
        setSelectedScore(undefined as any);
        data[score.index] = score;
        setData([...data]);
    }

    function sortData({ defaultSortDirection, event, sortBy, sortDirection }: any) {
        console.log(sortBy);

        const sorted = data.sort((a: any, b: any) => {
            const dir = sortDirection === SortDirection.ASC ? -1 : 1;
            const propA = a[sortBy];
            const propB = b[sortBy];

            if (propA < propB)
                return 1 * dir;
            if (propA > propB)
                return -1 * dir;

            return 0;
        });

        setData(sorted);
    }

    return (
        <Container>
            <HeaderRow>
                <EmptySpace/>
                <TableHeader/>
            </HeaderRow>
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
                                onHeaderClick={onHeaderClick}
                                rowStyle={{
                                    cursor: 'default'
                                }}
                                sort={sortData}
                                sortBy={sortKey}
                                sortDirection={sortDirection}
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
        </Container>
    )
};

const Container = styled(RoscoColumn)`

`;

const HeaderRow = styled(Row)`
    width: 85%;
`;

const EmptySpace = styled.div`
    flex-grow: 1;
`;

export default Scores;