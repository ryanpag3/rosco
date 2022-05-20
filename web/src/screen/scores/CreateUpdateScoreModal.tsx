import { DialogContent, DialogOverlay } from '@reach/dialog';
import Button from 'component/Button';
import Column from 'component/Column';
import Input from 'component/Input';
import Modal from 'component/Modal';
import Row from 'component/Row';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import * as ScoreApi from 'api/score';
const CreateUpdateScoreModal = (props: {
  action: string;
  server: any;
  score?: any;
  isOpen: boolean;
  onDismiss: (isShown: boolean) => void;
}) => {
  console.log(props.score);

  const [score, setScore] = useState(props.score);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onSubmit() {
    if (props.action.toLowerCase() === "update") {
      await ScoreApi.updateScore(props.server.id, props.score?.id, {
        name: score.name,
        description: score.description,
        color: score.color,
        amount: Number.parseInt(score.amount)
      });
    } else {
      await ScoreApi.createScore(props.server.id, {
        name: score.name,
        description: score.description,
        color: score.color,
        amount: Number.parseInt(score.amount)
      });
    }
  }

  function onDismiss() {
    setScore(undefined);
    props.onDismiss(false)
  }

  return (
    <Container>
      <StyledModal
        isOpen={props.isOpen}
        onDismiss={onDismiss}
      >
        <ModalHeader>{props.action} Score</ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit()
              .then(() => {
                setIsSubmitted(true);
                onDismiss()
              });
          }}
        >
          <Label>
            <LabelSpan>Name</LabelSpan>
            <StyledInput
              type="text"
              value={score?.name || props.score?.name}
              onChange={(e: any) => setScore({ ...score, ...{ name: e.target.value } })}
            />
          </Label>
          <Label>
            <LabelSpan>Description</LabelSpan>
            <StyledInput
              type="text"
              value={score?.description || props.score?.description}
              onChange={(e: any) => setScore({ ...score, ...{ description: e.target.value } })}
            />
          </Label>
          <Label>
            <LabelSpan>Amount</LabelSpan>
            <StyledInput
              type="text"
              value={score?.amount || props.score?.amount}
              onChange={(e: any) => setScore({ ...score, ...{ amount: e.target.value } })}
            />
          </Label>
          <Label>
            <LabelSpan>Color</LabelSpan>
            <StyledInput
              type="text"
              value={score?.color || props.score?.color}
              onChange={(e: any) => setScore({ ...score, ...{ color: e.target.value } })}
            />
          </Label>
          <ButtonRow>
            <CancelButton type="cancel"
              onClick={(e: any) => {
                e.preventDefault();
                onDismiss();
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

export default CreateUpdateScoreModal;