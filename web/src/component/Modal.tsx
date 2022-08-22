import { DialogContent, DialogOverlay } from '@reach/dialog';
import Column from 'component/Column';
import React from 'react'
import styled from 'styled-components';
import Colors from 'util/colors';

const Modal = (props: {
    isOpen: boolean
}|any) => {
  const dialogProps = {
    isOpen: props.isOpen,
    onDismiss: props.onDismiss
  };

  let contentProps = {
    ...props
  };

  delete contentProps.isOpen;
  delete contentProps.onDismiss;

  return (
    <Container>
      <StyledDialog
        {...dialogProps}
      >
        <DialogContentContainer
          {...contentProps}
        >
          {props.children}
        </DialogContentContainer>
      </StyledDialog>
    </Container>
  )
}

const Container = styled(Column)`

`;

const StyledDialog = styled(DialogOverlay)`
  z-index: 2;
`;

const DialogContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.BACKGROUND_DARK};
  padding: 2em;
`;

export default Modal;