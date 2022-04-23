import Row from 'component/Row';
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { FiRefreshCw } from 'react-icons/fi';
import Colors from 'util/colors';
import { FaCog } from 'react-icons/fa';
import SearchInput from './SearchInput';
import UpdatePermissionsModal from './UpdatePermissionsModal';
import { SelectedServerContext } from 'context/selected-server-context';

const TableActions = (props: {
  selectedCommands: any[];
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <SelectedServerContext.Consumer>
      {
        ({ server }) => (
          <Container>
            <SearchInput />
            <ConfigCog
              onClick={() => setShowUpdateModal(true)}
            />
            <UpdatePermissionsModal
              selectedCommands={props.selectedCommands}
              server={server}
              showDialog={showUpdateModal}
              setShowDialog={setShowUpdateModal}
            />
            <RefreshIcon />
          </Container>
        )
      }
    </SelectedServerContext.Consumer>

  )
}

const Container = styled(Row)`

`;

const IconStyle = css`
    font-size: .85em;
    margin: .5em .75em;
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