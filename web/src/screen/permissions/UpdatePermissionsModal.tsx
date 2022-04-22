import Dialog, { DialogContent, DialogOverlay } from '@reach/dialog';
import Column from 'component/Column'
import { SelectedServerContext } from 'context/selected-server-context';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Colors from 'util/colors';
import * as GuildApi from 'api/guild';
import Select from 'component/Select';
import { StylesConfig } from 'react-select';
import Button from 'component/Button';
import Row from 'component/Row';

const UpdatePermissionsModal = (props: {
  server: any;
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
}) => {
  const [roles, setRoles] = useState([] as any);
  const [selectedRoles, setSelectedRoles] = useState([] as any);
  
  useEffect(() => {
    if (roles.length !== 0)
      return;

    GuildApi.getRoles(props.server.id)
      .then((roles) => setRoles(roles.map((r: any) => {
        console.log(r);
        return {
          value: r.name,
          label: r.name,
          id: r.id,
        }
      })));
  }, [ roles ]);

  return (
      <Container>
        <StyledDialog
          isOpen={props.showDialog}
          onDismiss={() => props.setShowDialog(false)}
        >
          <ModalContainer>
            <AllowedRolesTitle>Allowed Roles</AllowedRolesTitle>
            <Description>Define the roles that will be allowed to use the selected command(s).</Description>
            <Select
              isMulti={true}
              placeholder="Select Roles"
              styles={SelectStyle}
              options={roles}
              onChange={(val: any) => setSelectedRoles(val)}
            />
            {/* <button onClick={() => props.setShowDialog(false)}>close</button> */}

            <FormButtonRow>
              <CancelButton
                onClick={() => props.setShowDialog(false)}
              >
                Cancel
              </CancelButton>
              <SubmitButton>
                Submit
              </SubmitButton>
            </FormButtonRow>
          </ModalContainer> 
        </StyledDialog>
      </Container>
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
  max-width: 35em;
  min-height: 8em;
  padding: 2em;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: .25em;
`;

const Description = styled.span`
  font-size: .9em;
  margin-bottom: .5em;
`;

const AllowedRolesTitle = styled(Title)`

`;

const SelectStyle: StylesConfig = {

};

const FormButtonRow = styled(Row)`
  width: 100%;
  justify-content: center;
`

const FormButton = styled(Button)`
  margin: 1em .5em;
  margin-bottom: 0;
  padding: .5em 2.25em;
  border-radius: .4em;
`;

const CancelButton = styled(FormButton)`

`;

const SubmitButton = styled(FormButton)`

`;

export default UpdatePermissionsModal