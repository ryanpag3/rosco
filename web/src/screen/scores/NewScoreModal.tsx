import Column from 'component/Column'
import Modal from 'component/Modal'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import Input from 'component/Input';
import Colors from 'util/colors';
import { HexColorPicker } from 'react-colorful';

// @ts-ignore
import isHexcolor from 'is-hexcolor';

const NewScoreModal = (props: any) => {
  const { register, handleSubmit, watch, formState: { errors }, setValue} = useForm();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const color = watch("color");

  async function onSubmit(data: any) {
    alert(JSON.stringify(data));
  }

  console.log(errors);

  return (
    <Container>
      <StyledModal>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Column>
            <FormLabel>Name</FormLabel>
            <FormInput 
              {...register("name", { required: true })} 
              style={{ width: '25em' }}/>
            { errors.name && <ErrorMessage>This is a required field.</ErrorMessage>}


            <FormLabel>Description</FormLabel>
            <FormInput 
              {...register("description")}
              style={{ width: '25em' }}/>
            
            <FormLabel>Amount</FormLabel>
            <FormInput 
              type="number"
              {...register("amount")}
              style={{ width: '10em' }}/>

            <div
            >
              <FormLabel>Color</FormLabel>
              <FormInput            
                onClick={() => { setShowColorPicker(!showColorPicker)}}
                {...register("color", {
                  validate: {
                    isHexColor: v => isHexcolor(v)
                  }
                })}
                onChange={(e: any) => setValue("color", e.target.value)}
                value={color}
                style={{
                  cursor: 'pointer',
                  width: '7em',
                  // caretColor: 'transparent'
                }}
                />
                { showColorPicker && <HexColorPicker
                  style={{
                    marginBottom: '1em'
                  }}
                  color={color}
                  onChange={(c) => setValue("color", c as any)}
                />}
                {/* @ts-ignore */}
                { (errors.color && errors.color.type === "isHexColor") && <ErrorMessage>A valid hex color is required.</ErrorMessage>}
            </div>
            <FormInput type="submit" />
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

const ErrorMessage = styled.span`
  color: #ffa2a2;
`;

export default NewScoreModal