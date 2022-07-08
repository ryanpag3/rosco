import Button from 'component/Button'
import Column from 'component/Column'
import LabelledInput from 'component/LabelledInput'
import Modal from 'component/Modal'
import Row from 'component/Row'
import React, { Fragment, useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import styled, { css } from 'styled-components'
import * as ScoreApi from 'api/score';

const ScoreModal = (props: {
  action: "Create" | "Update";
  server: any;
  score?: any;
  isOpen: boolean;
  onModalDismissed: (score: any) => void;
}) => {
  const [score, setScore] = useState(props.score);

  function cancel() {
    dismiss();
  }

  async function submit() {
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

    dismiss();
  }

  function dismiss() {

    props.onModalDismissed({
      name: score.name,
      description: score.description,
      color: score.color,
      amount: Number.parseInt(score.amount),
      createdAt: score.createdAt || new Date(),
      updatedAt: score.updatedAt || new Date()
    });

    setScore(undefined);
  }

  return (
    <Container>
      <StyledModal
        isOpen={props.isOpen}
        onDismiss={props.onModalDismissed}
      >
        <Header>{props.action} Score</Header>
        <Content>
          <Column>
            <StyledRow>
              <LabelledInput
                label="Name"
                value={score?.name || props.score?.name}
                labelStyle={LabelStyle}
                inputStyle={NameInputStyle}
                onChange={(value) => setScore({ ...props.score, ...score, ...{ name: value } })} />
            </StyledRow>

            <StyledRow>
              <LabelledInput
                label="Description"
                value={score?.description || props.score?.description}
                labelStyle={LabelStyle}
                inputStyle={DescriptionInputStyle}
                onChange={(value) => setScore({ ...props.score, ...score, ...{ description: value } })}
              />
            </StyledRow>

            <StyledRow>
              <LabelledInput
                label="Amount"
                value={score?.amount || props.score?.amount}
                labelStyle={LabelStyle}
                inputStyle={AmountInputStyle}
                onChange={(value) => setScore({ ...props.score, ...score, ...{ amount: value } })}
              />
              <LabelledInput
                label="Color"
                value="" // unused
                labelStyle={LabelStyle}
                inputStyle={InputStyle}
                inputOverride={<HexColorPicker
                  color={score?.color || props.score?.color}
                  onChange={(color) => setScore({ ...props.score, ...score, ...{ color } })}
                />}
              />
            </StyledRow>
          </Column>
          <ButtonRow>
            <CancelButton
              onClick={cancel}
            >Cancel</CancelButton>
            <SubmitButton
              onClick={submit}
            >Submit</SubmitButton>
          </ButtonRow>
        </Content>
      </StyledModal>
    </Container>
  )
}

const Container = styled(Column)`

`;

const StyledRow = styled(Row)`
  margin-top: .5em;
  margin-bottom: .5em;
`;

const StyledModal = styled(Modal)`
  width: 35em;
`;

const Content = styled(Column)`
  align-items: center;
`;

const Header = styled.h1`
  margin: 0;
`;

const LabelStyle = css`
  margin-right: 3em;
`;

const InputStyle = css`
  width: 10em;
  height: 2.5em;
`;

const NameInputStyle = css`
  ${InputStyle}
  width: 15em;
`;

const DescriptionInputStyle = css`
  ${InputStyle}
  width: 30em;
`;

const AmountInputStyle = css`
  ${InputStyle}
`;

const ButtonRow = styled(Row)`
  margin-top: 2em;
  margin-bottom: 1em;
  width: 100%;
  justify-content: space-evenly;
`;

const StyledButton = styled(Button)`
  padding-left: 2em; 
  padding-right: 2em;
`;

const CancelButton = styled(StyledButton)`

`;

const SubmitButton = styled(StyledButton)`

`;

export default ScoreModal