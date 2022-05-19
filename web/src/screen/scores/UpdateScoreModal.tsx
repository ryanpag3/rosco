import { DialogContent, DialogOverlay } from '@reach/dialog';
import Button from 'component/Button';
import Column from 'component/Column';
import Input from 'component/Input';
import Modal from 'component/Modal';
import Row from 'component/Row';
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
      <StyledModal
        isOpen={props.isOpen}
        onDismiss={() => props.onDismiss(false)}
      >
        <ModalHeader>Update Score</ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('submit');
          }}
        >
          <Label>
            <LabelSpan>Name</LabelSpan>
            <StyledInput type="text" value={props.score?.name}/>
          </Label>
          <Label>
            <LabelSpan>Description</LabelSpan>
            <StyledInput type="text" value={props.score?.description}/>
          </Label>
          <Label>
            <LabelSpan>Amount</LabelSpan>
            <StyledInput type="text" value={props.score?.amount}/>
          </Label>
          <Label>
            <LabelSpan>Color</LabelSpan>
            <StyledInput type="text" value={props.score?.color}/>
          </Label>
          <ButtonRow>
            <CancelButton type="cancel"
              onClick={(e: any) => {
                e.preventDefault();
                props.onDismiss(true);
              }}
            >
              Cancel
            </CancelButton>
            <SubmitButton type="submit">
              Submit
            </SubmitButton>
          </ButtonRow>
        </Form>
      </StyledModal>
    </Container>
  )
}

const Container = styled(Column)`

`;

const StyledModal = styled(Modal)`
  max-width: 38em;
`;

const ModalHeader = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  max-width: 15em;
  font-weight: bold;
  font-size: 1em;
  margin: 1em;
`;

const LabelSpan = styled.span`

`;

const StyledInput = styled(Input)`
  margin-top: .5em;
  font-size: 1em;
  border-radius: .25em;
  height: 2em; 
`;

const ButtonRow = styled(Row)`
  align-items: center;
`;

const StyledButton = styled(Button)`
  font-size: 1.1em;
  font-weight: bold;
  border-radius: .3em;
  padding-left: 2em;
  padding-right: 2em;
  margin: 1em;
  margin-bottom: 0em;
  border: 2px solid #909090;
`;

const SubmitButton = styled(StyledButton)`
  background-color: #afe9d8;
`;

const CancelButton = styled(StyledButton)`
  background-color: #e9baba;
`;

export default UpdateScoreModal;