import * as AutoModApi from 'api/automod'
import AutoModScreen from 'component/AutoModScreen'
import Button from 'component/Button'
import Input from 'component/Input'
import Row from 'component/Row'
import Section from 'component/Section'
import { SelectedServerContext } from 'context/selected-server-context'
import React, { useState } from 'react'
import styled from 'styled-components'

const CapslockDetect = () => {
  const [length, setLength] = useState(0);

  function updateLength (evt: any) {
    const res = isValidInput(evt);
    if (res === false || Number.isNaN(evt.target.valueAsNumber)) {
      alert('Only numbers are allowed.');
      setLength(0);
    } else if (evt.target.valueAsNumber < 0) {
      alert('Number cannot be negative');
      setLength(0);
    } else {
      setLength(evt.target.value);
    }
    return res;
  }

  function isValidInput (evt: any) {
    if (!isNumberKey(evt)) {
      return false;
    }
    return true;
  }

  function isNumberKey(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  return (
    <SelectedServerContext.Consumer>
      {
        ({ server }: any) => (
          <StyledAutoModScreen
            moduleName="Capslock Spam"
            server={server}
            isToggled={server.autoModCapslockDetectEnabled}
            onToggle={(isToggled: boolean) => {
              return AutoModApi.toggleModule(server.id, 'capslock-detect', isToggled).then()
            }}>

            <StyledSection
              description="Set the maximum length of consecutive capital letters allowed."
            >
              <StyledInput
                type="number"
                value={length}
                onChange={(e: any) => updateLength(e)}
              />
              <ButtonRow>
                <SubmitButton>Save</SubmitButton>
              </ButtonRow>              
            </StyledSection>
          </StyledAutoModScreen>)
      }
    </SelectedServerContext.Consumer>
  )
}

const StyledAutoModScreen = styled(AutoModScreen)`

`;

const StyledSection = styled(Section)`
  max-width: 24em;
`;

const StyledInput = styled(Input)`
    font-size: 1em;
    max-width: 25em;
    text-align: right;
    direction: rtl;
`;

const ButtonRow = styled(Row)`
  justify-content: center;
`;

const SubmitButton = styled(Button)`
  margin-top: 1em;
  width: 6em;
  border-radius: .3em;
`;

export default CapslockDetect