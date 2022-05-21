import Button from 'component/Button'
import Column from 'component/Column'
import LabelledInput from 'component/LabelledInput'
import Modal from 'component/Modal'
import Row from 'component/Row'
import React, { Fragment } from 'react'
import { HexColorPicker } from 'react-colorful'
import styled, { css } from 'styled-components'

const ScoreModal = (props: {
  action: "Create" | "Update";
  server: any;
  score?: any;
  isOpen: boolean;
  onDismiss: () => void;
}) => {
  return (
    <Container>
      <StyledModal>
        <Header>{props.action} Score</Header>
        <Content>
          <Column>
            <StyledRow>
              <LabelledInput
                label="Name"
                labelStyle={LabelStyle}
                inputStyle={NameInputStyle}
                onChange={(value) => console.log(value)} />
            </StyledRow>

            <StyledRow>
              <LabelledInput
                label="Description"
                labelStyle={LabelStyle}
                inputStyle={DescriptionInputStyle}
                onChange={(value) => console.log(value)}
              />
            </StyledRow>

            <StyledRow>
              <LabelledInput
                label="Amount"
                labelStyle={LabelStyle}
                inputStyle={AmountInputStyle}
                onChange={(value) => console.log(value)}
              />
              <LabelledInput
                label="Color"
                labelStyle={LabelStyle}
                inputStyle={InputStyle}
                onChange={(value) => console.log(value)}
                inputOverride={<HexColorPicker />}
              />
            </StyledRow>
          </Column>
          <ButtonRow>
              <CancelButton>Cancel</CancelButton>
              <SubmitButton>Submit</SubmitButton>
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