import React, { useEffect, useState } from 'react'
import Row from 'component/Row';
import Screen from 'component/Screen'
import styled from 'styled-components';
import Switch from 'react-switch';

const AutoModScreen = (props: {
  moduleName: string;
  isToggled: boolean;
  onToggle: (isToggled: boolean) => void;
  [x: string|number|symbol]: unknown;
}) => {
  const [isChecked, setIsChecked] = useState(undefined as any);
  
  function updateChecked(checked: boolean) {
    setIsChecked(checked);
    props.onToggle(checked);
  }

  function getChecked() {
    if (isChecked !== undefined) {
      return isChecked; 
    }

    return props.isToggled;
  }

  return (
    <StyledScreen {...props}>
      {props.server &&
        <React.Fragment>
          <Header>
            <ModuleName>{props.moduleName}</ModuleName>
            <EmptySpace />
            <EnabledLabel>
              Enabled
            </EnabledLabel>
            <StyledSwitch
              onChange={updateChecked}
              checked={getChecked()}
            />
          </Header>
          {props.children}
        </React.Fragment>
      }
    </StyledScreen>
  )
}

const StyledScreen = styled(Screen)`

`;

const Header = styled(Row)`
  margin: 2em;
  align-items: center;
`;

const ModuleName = styled.h1`
  margin: 0;
  font-size: 2.25em;
`;

const EmptySpace = styled.div`
    flex-grow: 1;
`;

const EnabledLabel = styled.span`
  margin-right: .5em;
`;

const StyledSwitch = styled(Switch as any)`
  margin-right: 1.5em;
`;

export default AutoModScreen