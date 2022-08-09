import Column from 'component/Column'
import Modal from 'component/Modal'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import Input from 'component/Input';
import { HexColorPicker } from 'react-colorful';
// @ts-ignore
import isHexcolor from 'is-hexcolor';
import Row from 'component/Row';
import Colors from 'util/colors';
import randomColor from 'randomcolor';
import * as ScoreApi from 'api/score';

const ScoreModal = (props: any) => {
  const { register, handleSubmit, watch, formState: { errors }, setValue} = useForm();
  const [showColorPicker, setShowColorPicker] = useState(true);
  const rColor = randomColor();
  const color = watch("color");
  const amount = watch("amount", 0);

  useEffect(() => {
    if (!color) {
      setValue("color", rColor);
    }

    if (!amount) {
      setValue("amount", 0);
    }
  }, [ color, amount ]);

  async function onSubmit(data: any) {
    await ScoreApi.createScore(props.server.id, {
      name: data.name,
      description: data.description,
      color: data.color,
      amount: Number.parseInt(data.amount)
    });

    dismissWindow(data);
  }

  async function onCancel(event: any) {
    event.preventDefault();
    dismissWindow();
  }

  async function dismissWindow(data?: any) {
    props.onModalDismissed(data ? { 
      ...data,
      createdAt: new Date(),
      updatedAt: new Date() 
    }: undefined);
  }

  return (
    <Container>
      <StyledModal
        isOpen={props.isOpen}
        onDismiss={() => props.onModalDismissed()}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Column>
            <FormLabel>Name</FormLabel>
            <FormInput 
              style={{ width: '25em' }}
              {...register("name", { required: true })} 
              />
            { errors.name && <ErrorMessage>This is a required field.</ErrorMessage>}


            <FormLabel>Description</FormLabel>
            <FormInput 
              {...register("description")}
              style={{ width: '25em' }}/>
            
            <FormLabel>Amount</FormLabel>
            <FormInput 
              type="number"
              {...register("amount", { required: true })}
              style={{ width: '10em' }}
              value={amount}
              />

            <ColorContainer
            >
              <FormLabel>Color</FormLabel>
              <FormInput            
                onClick={() => { setShowColorPicker(!showColorPicker)}}
                {...register("color", {
                  required: true,
                  validate: {
                    isHexColor: v => isHexcolor(v)
                  },
                })}
                onChange={(e: any) => setValue("color", e.target.value)}
                value={color}
                style={{
                  cursor: 'pointer',
                  width: '7em'
                }}
                />
                { showColorPicker && <ColorPicker
                  style={{
                    marginBottom: '1em'
                  }}
                  color={color}
                  onChange={(c) => setValue("color", c as any)}
                />}
                {/* @ts-ignore */}
                { (errors.color && errors.color.type === "isHexColor") && <ErrorMessage>A valid hex color is required.</ErrorMessage>}
            </ColorContainer>
            <MenuRow>
              <CancelInput type="submit" value="Cancel" onClick={onCancel}/>
              <SubmitInput type="submit" value="Submit"/>
            </MenuRow>
          </Column> 
        </Form>
      </StyledModal>
    </Container>
  )
}

const Container = styled(Column)`

`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  max-width: 30em;
`;

const Form = styled.form`

`;

const FormLabel = styled.label`
  margin-right: .5em;
  font-size: 1em;
  font-weight: bold;
`;

const FormInput = styled(Input)`
  font-size: .85em;
  margin-bottom: .5em;
`;

const MenuRow = styled(Row)`
  width: 100%;
  justify-content: space-evenly;
`;

const SubmitInput = styled(FormInput)`
  width: 10em;
  padding: .6em;
  margin: .5em;
  font-weight: bold;
  background-color: ${Colors.BUTTON_GREEN};
  border: none;
  cursor: pointer;
`;

const CancelInput = styled(SubmitInput)`
  background-color: #ffaaaa;  
`;

const ErrorMessage = styled.span`
  color: #ffa2a2;
`;

const ColorContainer = styled(Column)`
  margin-top: 1em;
`;

const ColorPicker = styled(HexColorPicker)`
  margin-top: .55em;
`;
export default ScoreModal