import React, { useState } from 'react'
import Button from 'component/Button';
import Column from 'component/Column';
import styled from 'styled-components';
import { FaDiscord } from 'react-icons/fa';
import BetaInviteConfirmationModal from './BetaInviteConfirmationModal';
import InviteButton from './InviteButton';

const InviteMenu = () => {
  const [displayInviteConfirmModal, setDisplayInviteConfirmModal] = useState(false);

  return (
    <Container>
        {
          displayInviteConfirmModal &&
          <BetaInviteConfirmationModal onClose={() => setDisplayInviteConfirmModal(false)}/>
        }
        <InviteButton
          onClick={() => setDisplayInviteConfirmModal(true)}
        />
        <TryItYourselfAnchor
            onClick={() => window.open("https://discord.gg/YVcXfJWEhA", "_blank")}
        >Or try it yourself first</TryItYourselfAnchor>
    </Container>
  )
}

const Container = styled(Column)`
    align-items: center;
    margin-top: 7em;

    @media (max-width:500px) {
      margin-top: 3em;
    }
`;





const TryItYourselfAnchor = styled.a`
    margin-top: 1em;

    :hover {
        cursor: pointer;
    }
`;

export default InviteMenu;