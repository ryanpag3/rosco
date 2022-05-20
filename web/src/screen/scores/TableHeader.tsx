import Row from 'component/Row';
import React, { useState } from 'react'
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import TableHeaderIconStyle from 'component/TableHeaderIconStyle';
import CreateUpdateScoreModal from './CreateUpdateScoreModal';

const TableHeader = (props: any) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
      <Container>
          <CreateUpdateScoreModal
                action="Create"
                server={props.server}
                isOpen={showCreateModal}
                onDismiss={() => {
                  setShowCreateModal(false)
                  props.onDismiss();
                }}
            />
          <AddIcon
            onClick={() => setShowCreateModal(true)}
          />
      </Container>
  )
}

const Container = styled(Row)``;

const AddIcon = styled(FaPlus)`
    ${TableHeaderIconStyle}
`;

export default TableHeader