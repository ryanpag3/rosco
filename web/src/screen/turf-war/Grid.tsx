import { getGrid } from 'api/turfwar';
import Column from 'component/Column';
import Row from 'component/Row'
import React, { useEffect, useState } from 'react'
import { FixedSizeGrid } from 'react-window';
import styled from 'styled-components'

const Grid = (props: any) => {

  const [grid, setGrid] = useState(undefined as any);

  useEffect(() => {
    async function run() {
      console.log("running");

      const res = await getGrid();
      if (!res)
        return;

      setGrid(res?.data);
    } run();
  }, [grid === undefined]);

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const cell = grid.grid[`${columnIndex}_${rowIndex}`];
    const color = cell?.color || '#FFFFFF';
    console.log(color);

    return (
      <CellContainer color={color} style={style}/>
    )
  }

  return (
    <Container>

    </Container>
  )
}



const CellContainer = styled(Column)`
  height: .1em;
  width: .1em;
  background-color: ${(props) => props.color};
`;

const Container = styled(Row)`
  max-width: 100em;
`;

export default Grid