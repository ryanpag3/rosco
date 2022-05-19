import { DialogContent, DialogOverlay } from '@reach/dialog';
import Column from 'component/Column';
import React from 'react'
import styled from 'styled-components';
import Colors from 'util/colors';

const Modal = (props: {
    isOpen: boolean
}|any) => {
  return (
    <Container>
      <StyledDialog
        {...props}
      >
        <DialogContentContainer
          {...props}
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