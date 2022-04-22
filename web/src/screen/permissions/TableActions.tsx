import Row from 'component/Row';
import React from 'react'
import styled, { css } from 'styled-components'
import { FiRefreshCw } from 'react-icons/fi';
import Colors from 'util/colors';
import { FaCog } from 'react-icons/fa';

const TableActions = () => {
  return (
      <Container>
          <ConfigCog/>
          <RefreshIcon/>
      </Container>
  )
}

const Container = styled(Row)`

`;

const IconStyle = css`
    font-size: 1em;
    margin: .5em;
    cursor: pointer;
    color: ${Colors.TEXT_MEDIUM};

    /* :hover {
        color: ${Colors.TEXT_LIGHT_HOVER};
    } */
`;

const RefreshIcon = styled(FiRefreshCw)`
    ${IconStyle}
`;

const ConfigCog = styled(FaCog)`
    ${IconStyle}
`;

export default TableActions