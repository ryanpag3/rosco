import Row from 'component/Row';
import React, { useState } from 'react'
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import TableHeaderIconStyle from 'component/TableHeaderIconStyle';
import ScoreModal from './ScoreModal';
import SearchInput from 'component/SearchInput';

const TableHeader = (props: any) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <Container>
      <ScoreModal
        action="Create"
        server={props.server}
        isOpen={showCreateModal}
        onModalDismissed={(score) => {
          setShowCreateModal(false)
          props.onDismiss(score);
        }}
      />
      <SearchInput
        onChange={(text) => props.onFilterChanged(text.target.value)}
      />
      <AddIcon
        onClick={() => setShowCreateModal(true)}
      />
    </Container>
  )
}

const Container = styled(Row)`
  align-items: center;
  padding-top: .1em;
`;

const AddIcon = styled(FaPlus)`
    ${TableHeaderIconStyle}
    padding-top: .2em;
    font-size: 1.2em;
    margin-right: 1em;
`;

export default TableHeader