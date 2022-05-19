import { DialogContent, DialogOverlay } from '@reach/dialog';
import Column from 'component/Column';
import Modal from 'component/Modal';
import React, { useState } from 'react'
import styled from 'styled-components';
import Colors from 'util/colors';

const UpdateScoreModal = (props: {
  score?: any;
  isOpen: boolean;
  onDismiss: (dismissed: boolean) => void;
}) => {

  return (
    <Container>
      <Modal
        isOpen={props.isOpen}
        onDismiss={() => props.onDismiss(false)}
      >
        <span>{JSON.stringify(props.score)}</span>
      </Modal>
    </Container>
  )
}

const Container = styled(Column)`

`;

const StyledModal = styled(Modal)`

`;

export default UpdateScoreModal;