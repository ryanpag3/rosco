import Dialog, { DialogContent, DialogOverlay } from '@reach/dialog';
import Column from 'component/Column'
import { SelectedServerContext } from 'context/selected-server-context';
import React, { useState } from 'react'
import styled from 'styled-components'
import Colors from 'util/colors';

const UpdatePermissionsModal = (props: {
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
}) => {
  return (
    <SelectedServerContext.Consumer>
      {
        ({ server }) => (
          <Container>
            <StyledDialog
              isOpen={props.showDialog}
              onDismiss={() => props.setShowDialog(false)}
            >
              <ModalContainer>
                <button onClick={() => props.setShowDialog(false)}>close</button>
              </ModalContainer> 
            </StyledDialog>
          </Container>
        )
      }

    </SelectedServerContext.Consumer>

  )
}
const Container = styled(Column)`

`;

const StyledDialog = styled(DialogOverlay)`
  z-index: 2;
`;

const ModalContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.BACKGROUND_DARK};
  width: 20em;
  height: 8em;
`;

export default UpdatePermissionsModal