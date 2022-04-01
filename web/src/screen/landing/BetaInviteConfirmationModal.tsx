import React, { useEffect, useRef, useState } from 'react'
import Column from 'component/Column';
import Row from 'component/Row';
import styled from 'styled-components';
import InviteButton from './InviteButton';

const BetaInviteConfirmationModal = (props: {
  onClose: () => void;
}) => {
  const ref: any = useRef(null);

  function onClose(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      props.onClose();
    }
  }

  useEffect(() => {
      document.addEventListener('click', onClose, true);
      return () => {
          document.removeEventListener('click', onClose, true);
      };
  }, []);

  return (
      <Container ref={ref}>
        <TopRow>
          <ModalTitle>Invite Confirmation</ModalTitle>
        </TopRow>
        <ModalDescription>Rosco is currently in <b>beta</b> pre-release. There may be periods of short downtime and maintenence as we work on making this the best Discord bot for our users. If you are okay with that, press the invite button below to proceed.</ModalDescription>
        <StyledInviteButton/>
      </Container>
    );
}

const Container = styled(Column)`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 20em;
  height: 17em;
  padding: .5em;
  padding-left: 1em;
  border-radius: .5em;

  @media (min-width:801px)  {
    max-width: 700px;
    max-height: 300px;
  }
`;

const TopRow = styled(Row)`
  justify-content: center;
`;

const ModalTitle = styled.h1`
  margin: 0;
  padding: 0;
  color: black;
  font-size: 1.5em;
`;

const ModalDescription = styled.text`
  color: black;
  text-align: center;
  padding: .35em;
  font-size: 1em;
`;

const StyledInviteButton = styled(InviteButton)`
  width: 70%;
  margin-top: .5em;
`;

export default BetaInviteConfirmationModal;